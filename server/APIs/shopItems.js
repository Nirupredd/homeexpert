const express = require('express');
const shopItemsApp = express.Router();
const shopItemsModel = require('../Models/shopItemsModel');
const expressAsyncHandler = require('express-async-handler');

// GET all shop items
shopItemsApp.get('/shopitems', expressAsyncHandler(async (req, res) => {
  // Fetch all shop items from the database
  const shopItems = await shopItemsModel.find();
  res.status(200).send({ message: "Shop items fetched successfully", payload: shopItems });
}));

// GET a single shop item by ID
shopItemsApp.get('/shopitem/:_id',expressAsyncHandler(async(req,res)=>{
    console.log(req.params._id);
    const shopItem=await shopItemsModel.findOne({_id:req.params._id});
    res.status(201).send({message:"Shop item fetched successfully ",payload:shopItem})
}))

// GET a single shop item by NAME (from the name array)
shopItemsApp.get('/shopItem/name/:name', expressAsyncHandler(async (req, res) => {
    const itemName = req.params.name;
    const shopItem = await shopItemsModel.findOne({ name: { $in: [itemName] } });
    if (!shopItem) {
      return res.status(404).send({ message: "Shop item not found" });
    }
    res.status(201).send({ message: "Shop item fetched successfully", payload: shopItem });
}));

//GET items based on catogery
shopItemsApp.get('/shopItem/category/:category',expressAsyncHandler(async(req,res)=>{
    const categoryName=req.params.category;
    const shopItems= await shopItemsModel.find({category:categoryName})
    if (!shopItems) {
        return res.status(404).send({ message: "Shop item's not found" });
      }
      res.status(201).send({ message: "Shop item's fetched successfully", payload: shopItems });
}))

module.exports = shopItemsApp;