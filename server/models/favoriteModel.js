const mongoose = require('mongoose');

// Define the schema for user favorites/wishlist
const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'productType'
  },
  productType: {
    type: String,
    required: true,
    enum: ['shopItem', 'shopGood']
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Compound index to ensure a user can't add the same product twice
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = Favorite;
