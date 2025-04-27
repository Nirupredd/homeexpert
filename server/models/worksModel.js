const mongoose = require('mongoose');

// Define the schema for works
const worksSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour:{
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const worksModel = mongoose.model('workerType', worksSchema,"workerTypes");

module.exports = worksModel;