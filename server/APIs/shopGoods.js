const express = require('express');
const shopGoodsApp = express.Router();
const shopGoodsModel = require('../models/shopGoodsModel');
const expressAsyncHandler = require('express-async-handler');

// GET all shop goods
shopGoodsApp.get('/shopGoods', expressAsyncHandler(async (req, res) => {
  // Fetch all shop goods from the database
  const shopGoods = await shopGoodsModel.find();
  res.status(200).send({ message: "Shop good's fetched successfully", payload: shopGoods });
}));

// GET a single shop good by ID
shopGoodsApp.get('/shopgood/:_id',expressAsyncHandler(async(req,res)=>{
    console.log(req.params._id);
    const shopItem=await shopGoodsModel.findOne({_id:req.params._id});
    res.status(201).send({message:"Shop good fetched successfully ",payload:shopItem})
}))

// GET a single shop good by NAME (from the name array)
shopGoodsApp.get('/shopGood/name/:name', expressAsyncHandler(async (req, res) => {
    const itemName = req.params.name;
    const shopItem = await shopGoodsModel.findOne({ name: { $in: [itemName] } });
    if (!shopItem) {
      return res.status(404).send({ message: "Shop item not found" });
    }
    res.status(201).send({ message: "Shop good fetched successfully", payload: shopItem });
}));

//GET goods based on catogery
shopGoodsApp.get('/shopGood/category/:category',expressAsyncHandler(async(req,res)=>{
    const categoryName=req.params.category;
    const shopGoods= await shopGoodsModel.find({category:categoryName})
    if (!shopGoods) {
        return res.status(404).send({ message: "Shop good's not found" });
      }
      res.status(201).send({ message: "Shop good's fetched successfully", payload: shopGoods });
}))

module.exports = shopGoodsApp;