const config = require('../config/config');

// Lazy-load Twilio only when needed
let twilioClient = null;

/**
 * Get Twilio client instance
 * @returns {Object|null} Twilio client or null if not configured
 */
const getTwilioClient = () => {
  // If we've already checked, return the cached result
  if (twilioClient !== undefined) {
    return twilioClient;
  }

  // Get Twilio credentials from config or use hardcoded values if not set
  const accountSid = config.twilio.accountSid || 'ACe12d67933fe329d906769dad9de1cbf3';
  const authToken = config.twilio.authToken || 'c54d5f837d8a060f95edb190a0b4f1bb';
  const phoneNumber = config.twilio.phoneNumber || '+17856453337';
  const enabled = config.twilio.enabled || true; // Force enable for testing

  // Check if Twilio credentials are properly set and enabled
  const isConfigured =
    enabled === true &&
    accountSid &&
    accountSid.startsWith('AC') &&
    authToken &&
    phoneNumber;

  // Only initialize if properly configured
  if (isConfigured) {
    try {
      // Dynamically require twilio only when needed
      const twilio = require('twilio');
      twilioClient = twilio(accountSid, authToken);
      console.log('Twilio client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Twilio client:', error.message);
      twilioClient = null;
    }
  } else {
    console.warn('Twilio is not properly configured. SMS functionality will be simulated in development mode.');
    twilioClient = null;
  }

  return twilioClient;
}

/**
 * Send SMS using Twilio
 * @param {string} to - Recipient phone number (with country code)
 * @param {string} message - Message content
 * @returns {Promise} - Promise that resolves with message details or rejects with error
 */
const sendSMS = async (to, message) => {
  try {
    // Get Twilio client (lazy-loaded)
    const client = getTwilioClient();

    // Always log the message for debugging
    console.log(`Attempting to send SMS to ${to}: ${message}`);
    console.log('Twilio enabled:', config.twilio.enabled);
    console.log('Twilio client initialized:', !!client);

    // Format the phone number if it doesn't have a country code
    let formattedNumber = to;
    if (!to.startsWith('+')) {
      formattedNumber = `+91${to}`; // Assuming Indian numbers, adjust as needed
      console.log(`Formatted phone number: ${formattedNumber}`);
    }

    // Only attempt to send SMS if Twilio is properly configured
    if (client) {
      // Get phone number from config
      const phoneNumber = config.twilio.phoneNumber;

      try {
        const result = await client.messages.create({
          body: message,
          from: phoneNumber,
          to: formattedNumber
        });

        console.log(`SMS sent to ${formattedNumber}, SID: ${result.sid}`);
        return { success: true, messageId: result.sid };
      } catch (twilioError) {
        console.error('Twilio API error:', twilioError);
        // Return the OTP in development mode even if SMS sending fails
        if (config.environment !== 'production') {
          console.log(`[DEV MODE] SMS would be sent to ${formattedNumber}: ${message}`);
          return { success: true, dev: true, error: twilioError.message };
        }
        return { success: false, error: twilioError.message };
      }
    } else {
      // In development mode, simulate SMS sending
      if (config.environment !== 'production') {
        console.log(`[DEV MODE] SMS would be sent to ${formattedNumber}: ${message}`);
        return { success: true, dev: true };
      } else {
        console.warn('Attempted to send SMS without Twilio configured');
        return { success: false, error: 'Twilio not configured' };
      }
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    // Don't throw the error, just return failure
    return { success: false, error: error.message };
  }
};

/**
 * Send OTP via SMS
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} otp - One-time password
 * @returns {Promise} - Promise from sendSMS
 */
const sendOTP = async (phoneNumber, otp) => {
  const expiryMinutes = config.otp.expiryTime / (60 * 1000);
  const message = `Your HomeXpert verification code is: ${otp}. This code will expire in ${expiryMinutes} minutes.`;
  const result = await sendSMS(phoneNumber, message);

  // Always return the OTP in development mode for testing
  if (config.environment !== 'production') {
    return { ...result, otp };
  }

  return result;
};

module.exports = {
  sendSMS,
  sendOTP
};
