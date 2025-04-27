const mongoose = require('mongoose');

// Define the schema for user addresses
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  addressType: {
    type: String,
    enum: ['home', 'work', 'other'],
    default: 'home'
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Middleware to ensure only one default address per user
addressSchema.pre('save', async function(next) {
  if (this.isDefault) {
    // Find all other addresses for this user and set isDefault to false
    await this.constructor.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address;
