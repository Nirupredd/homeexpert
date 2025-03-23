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
// update shopkeeper by id
shopKeeperApp.put('/shopKeeperupdate/:id', expressAsyncHandler(async (req, res) => {
  console.log("Replacing shopKeeper:", req.params.id);
  // Find and replace shopKeeper by shopKeeper id
  const updatedshopKeeper = await shopKeeperModel.findOneAndReplace(
      { _id: req.params.id },  // Find shopKeeper by shopKeeperId
      req.body,  // Replace with full new object
      { new: true }  // Return updated shopKeeper
  );
  if (!updatedshopKeeper) {
      return res.status(404).send({ message: "shopKeeper not found" });
  }
  res.status(200).send({ message: "shopKeeper modified successfully", payload: updatedshopKeeper });
}));



//get all shopkeepers
shopKeeperApp.get('/shopkeepers',expressAsyncHandler(async(req,res)=>{
  const shoppersons=await shopKeeperModel.find();
  res.status(201).send({message:"shopkeeper persons",payload:shoppersons})
  }))

//get shopkeeper by id
shopKeeperApp.get('/shopkeeper/:id',expressAsyncHandler(async(req,res)=>{
  console.log(req.params.id);
  const shopkeeper=await shopKeeperModel.findOne({_id:req.params.id});
  res.status(201).send({message:"shopkeepers",payload:shopkeeper})
}))

//delete shopkeeper by id
shopKeeperApp.delete('/shopkeeperid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await shopKeeperModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"Shop Kepper deleted",payload:d_id})
}))

//delete shopkeeper by id
shopKeeperApp.delete('/shopkeeper/:shopKeeperId',expressAsyncHandler(async(req,res)=>{
   const delete_id=await shopKeeperModel.findOneAndDelete({shopKeeperId:req.params.shopKeeperId})
   res.status(201).send({message:"Shop Keeper deleted ",payload:delete_id})
}))

module.exports=shopKeeperApp;