// Configuration settings for the application
// Load environment variables from .env file if not already loaded
require('dotenv').config();

module.exports = {

  // OTP configuration
  otp: {
    expiryTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    length: 6,
    retries: 3, // Number of attempts allowed
    resendDelay: 60 * 1000, // 1 minute delay before resending
  },

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Server configuration
  server: {
    port: process.env.PORT || 3000, // Use port 3000 as default
  },

  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/homeexpert',
  },
};
