const mongoose = require('mongoose');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const crypto = require('crypto');
const config = require('../config/config');

const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'IN'); // Change 'IN' to default country if needed
    return phoneNumber ? phoneNumber.isValid() : false;
};

// Address information schema
const bulinfo = new mongoose.Schema({
    flatNO: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }
});

// User address schema
const userAdd = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Pincode must be exactly 6 digits"],
    },
    address: {
        type: bulinfo,
        required: true
    }
});



// OTP schema for verification
const otpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: function() {
            return new Date(Date.now() + config.otp.expiryTime); // OTP expires based on config
        }
    },
    verified: {
        type: Boolean,
        default: false
    }
});

// Main user schema
const userSchema = new mongoose.Schema({
    profileImg: {
        type: String
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validatePhoneNumber,
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },

    Address: {
        type: userAdd,
        required: false // Not required during initial registration
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: otpSchema
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


// Method to generate OTP
userSchema.methods.generateOTP = function() {
    // Generate a secure 6-digit OTP using crypto
    let otp;

    // Use crypto if available, fallback to Math.random
    try {
        // Generate a random number between 100000 and 999999
        const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits, enough for 6 digits
        const number = buffer.readUIntBE(0, 3); // Read as unsigned integer
        otp = (number % 900000 + 100000).toString(); // Ensure 6 digits
    } catch (error) {
        // Fallback to Math.random if crypto fails
        console.error('Crypto failed, using Math.random fallback:', error);
        otp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    this.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + config.otp.expiryTime), // Expiry based on config
        verified: false
    };

    return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function(code) {
    if (!this.otp) return false;

    // Check if OTP is expired
    if (this.otp.expiresAt < new Date()) return false;

    // Check if OTP matches
    if (this.otp.code !== code) return false;

    // Mark OTP as verified
    this.otp.verified = true;
    this.isVerified = true;

    return true;
};

const User = mongoose.model('user', userSchema);

module.exports = User;