const exp=require('express');
const shopKeeperApp=exp.Router();
const shopKeeperModel=require('../models/shopKeeperModel');
const expressAsyncHandler=require('express-async-handler');
// post the shopKeeper
shopKeeperApp.post('/shopkeeper',expressAsyncHandler(async(req,res)=>{
    //bussiness logic 
     //get shopKeeper or author
     const shopKeeper=req.body;
    //  find shopKeeper by email id
      let newshopKeeper=new shopKeeperModel(shopKeeper);
      let newshopKeeperDoc=await newshopKeeper.save();
      res.status(201).send({message:newshopKeeperDoc.role,payload:newshopKeeperDoc})
}));


//get all shopkeepers
shopKeeperApp.get('/shopkeepers',expressAsyncHandler(async(req,res)=>{
  const shoppersons=await shopKeeperModel.find();
  res.status(201).send({message:"shopkeeper persons",payload:shoppersons})
  }))

//get shopkeeper by phone 
shopKeeperApp.get('/shopkeeper/:mobileNumber',expressAsyncHandler(async(req,res)=>{
  console.log(req.params.mobileNumber);
  const shopkeeper=await shopKeeperModel.findOne({mobileNumber:req.params.mobileNumber});
  res.status(201).send({message:"shopkeepers",payload:shopkeeper})
}))

//delete shopkeeper by id
shopKeeperApp.delete('/shopkeeperid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await shopKeeperModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"Shop Kepper deleted",payload:d_id})
}))

//delete shopkeeper by phonenumber
shopKeeperApp.delete('/shopkeeperph/:mobileNumber',expressAsyncHandler(async(req,res)=>{
   const delete_id=await shopKeeperModel.findOneAndDelete({mobileNumber:req.params.mobileNumber})
   res.status(201).send({message:"Shop Keeper deleted ",payload:delete_id})
}))

module.exports=shopKeeperApp;