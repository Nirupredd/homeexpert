const express = require('express');
const orderApp = express.Router();
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const shopItemsModel = require('../Models/shopItemsModel');
const shopGoodsModel = require('../models/shopGoodsModel');
const expressAsyncHandler = require('express-async-handler');

// Create a new order
orderApp.post('/order', expressAsyncHandler(async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate user exists
    const user = await userModel.findById(orderData.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    // Create new order
    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();
    
    res.status(201).send({ 
      message: "Order placed successfully", 
      payload: savedOrder 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to place order", 
      error: error.message 
    });
  }
}));

// Get all orders for a user
orderApp.get('/orders/:userId', expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find all orders for the user
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).send({ 
      message: "Orders fetched successfully", 
      payload: orders 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to fetch orders", 
      error: error.message 
    });
  }
}));

// Get a specific order by ID
orderApp.get('/order/:orderId', expressAsyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    
    // Find the order
    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    
    res.status(200).send({ 
      message: "Order fetched successfully", 
      payload: order 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to fetch order", 
      error: error.message 
    });
  }
}));

// Update order status
orderApp.patch('/order/:orderId/status', expressAsyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { orderStatus } = req.body;
    
    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { 
        orderStatus,
        ...(orderStatus === 'DELIVERED' ? { deliveredAt: new Date() } : {}),
        ...(orderStatus === 'CANCELLED' ? { cancelledAt: new Date(), cancelReason: req.body.cancelReason } : {})
      },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    
    res.status(200).send({ 
      message: "Order status updated successfully", 
      payload: updatedOrder 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to update order status", 
      error: error.message 
    });
  }
}));

// Add rating and feedback to an order
orderApp.patch('/order/:orderId/feedback', expressAsyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { rating, feedback } = req.body;
    
    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { rating, feedback },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    
    res.status(200).send({ 
      message: "Feedback added successfully", 
      payload: updatedOrder 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to add feedback", 
      error: error.message 
    });
  }
}));

// Get recent orders for a user (last 5 orders)
orderApp.get('/orders/:userId/recent', expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find recent orders for the user
    const recentOrders = await orderModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).send({ 
      message: "Recent orders fetched successfully", 
      payload: recentOrders 
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Failed to fetch recent orders", 
      error: error.message 
    });
  }
}));

module.exports = orderApp;
