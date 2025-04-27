const express = require('express');
const addressApp = express.Router();
const addressModel = require('../models/addressModel');
const userModel = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

// Add a new address
addressApp.post('/address', expressAsyncHandler(async (req, res) => {
  try {
    const addressData = req.body;
    
    // Validate user exists
    const user = await userModel.findById(addressData.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    // If this is the first address, make it default
    const addressCount = await addressModel.countDocuments({ userId: addressData.userId });
    if (addressCount === 0) {
      addressData.isDefault = true;
    }
    
    // Create new address
    const newAddress = new addressModel(addressData);
    const savedAddress = await newAddress.save();
    
    res.status(201).send({ 
      message: "Address added successfully", 
      payload: savedAddress 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to add address", 
      error: error.message 
    });
  }
}));

// Get all addresses for a user
addressApp.get('/addresses/:userId', expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find all addresses for the user
    const addresses = await addressModel.find({ userId }).sort({ isDefault: -1, createdAt: -1 });
    
    res.status(200).send({ 
      message: "Addresses fetched successfully", 
      payload: addresses 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to fetch addresses", 
      error: error.message 
    });
  }
}));

// Get a specific address by ID
addressApp.get('/address/:addressId', expressAsyncHandler(async (req, res) => {
  try {
    const addressId = req.params.addressId;
    
    // Find the address
    const address = await addressModel.findById(addressId);
    
    if (!address) {
      return res.status(404).send({ message: "Address not found" });
    }
    
    res.status(200).send({ 
      message: "Address fetched successfully", 
      payload: address 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to fetch address", 
      error: error.message 
    });
  }
}));

// Update an address
addressApp.put('/address/:addressId', expressAsyncHandler(async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const addressData = req.body;
    
    // Find and update the address
    const updatedAddress = await addressModel.findByIdAndUpdate(
      addressId,
      addressData,
      { new: true }
    );
    
    if (!updatedAddress) {
      return res.status(404).send({ message: "Address not found" });
    }
    
    res.status(200).send({ 
      message: "Address updated successfully", 
      payload: updatedAddress 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to update address", 
      error: error.message 
    });
  }
}));

// Delete an address
addressApp.delete('/address/:addressId', expressAsyncHandler(async (req, res) => {
  try {
    const addressId = req.params.addressId;
    
    // Find and delete the address
    const deletedAddress = await addressModel.findByIdAndDelete(addressId);
    
    if (!deletedAddress) {
      return res.status(404).send({ message: "Address not found" });
    }
    
    // If the deleted address was the default, set another address as default
    if (deletedAddress.isDefault) {
      const anotherAddress = await addressModel.findOne({ userId: deletedAddress.userId });
      if (anotherAddress) {
        anotherAddress.isDefault = true;
        await anotherAddress.save();
      }
    }
    
    res.status(200).send({ 
      message: "Address deleted successfully", 
      payload: deletedAddress 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to delete address", 
      error: error.message 
    });
  }
}));

// Set an address as default
addressApp.patch('/address/:addressId/default', expressAsyncHandler(async (req, res) => {
  try {
    const addressId = req.params.addressId;
    
    // Find the address
    const address = await addressModel.findById(addressId);
    
    if (!address) {
      return res.status(404).send({ message: "Address not found" });
    }
    
    // Set all addresses for this user as non-default
    await addressModel.updateMany(
      { userId: address.userId },
      { isDefault: false }
    );
    
    // Set this address as default
    address.isDefault = true;
    await address.save();
    
    res.status(200).send({ 
      message: "Address set as default successfully", 
      payload: address 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to set address as default", 
      error: error.message 
    });
  }
}));

module.exports = addressApp;
