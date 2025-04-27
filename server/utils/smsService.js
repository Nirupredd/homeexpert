const config = require('../config/config');

/**
 * Simulate sending SMS
 * @param {string} to - Recipient phone number (with country code)
 * @param {string} message - Message content
 * @returns {Promise} - Promise that resolves with message details
 */
const sendSMS = async (to, message) => {
  try {
    // Format the phone number if it doesn't have a country code
    let formattedNumber = to;
    if (!to.startsWith('+')) {
      formattedNumber = `+91${to}`; // Assuming Indian numbers, adjust as needed
      console.log(`Formatted phone number: ${formattedNumber}`);
    }

    // Log the message for debugging
    console.log(`[OTP DISPLAY] SMS to ${formattedNumber}: ${message}`);

    // Always simulate successful sending
    return {
      success: true,
      dev: true,
      displayMessage: message
    };
  } catch (error) {
    console.error('Error in SMS service:', error);
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
