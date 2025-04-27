const exp=require('express');
const vendorApp=exp.Router();
const vendorModel=require('../Models/vendorModel');
const expressAsyncHandler=require('express-async-handler');
// post the vendor
vendorApp.post('/vendor',expressAsyncHandler(async(req,res)=>{
    //bussiness logic 
     //get vendor or author
     const vendor=req.body;
    //  find vendor by email id
      let newvendor=new vendorModel(vendor);
      let newvendorDoc=await newvendor.save();
      res.status(201).send({message:newvendorDoc.role,payload:newvendorDoc})
}));
// update vendor by id
vendorApp.put('/vendorupdate/:id', expressAsyncHandler(async (req, res) => {
  console.log("Replacing vendor:", req.params.id);
  // Find and replace vendor by vendor id
  const updatedvendor = await vendorModel.findOneAndReplace(
      { _id: req.params.id },  // Find vendor by vendorId
      req.body,  // Replace with full new object
      { new: true }  // Return updated vendor
  );
  if (!updatedvendor) {
      return res.status(404).send({ message: "vendor not found" });
  }
  res.status(200).send({ message: "vendor modified successfully", payload: updatedvendor });
}));



//get all vendors
vendorApp.get('/vendors',expressAsyncHandler(async(req,res)=>{
  const shoppersons=await vendorModel.find();
  res.status(201).send({message:"vendor persons",payload:shoppersons})
  }))

//get vendor by id
vendorApp.get('/vendor/:id',expressAsyncHandler(async(req,res)=>{
  console.log(req.params._id);
  const vendor=await vendorModel.findOne({_id:req.params.id});
  res.status(201).send({message:"vendors",payload:vendor})
}))

//delete vendor by id
vendorApp.delete('/vendorid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await vendorModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"Shop Kepper deleted",payload:d_id})
}))

//delete vendor by id
vendorApp.delete('/vendor/:vendorId',expressAsyncHandler(async(req,res)=>{
   const delete_id=await vendorModel.findOneAndDelete({vendorId:req.params.vendorId})
   res.status(201).send({message:"Shop Keeper deleted ",payload:delete_id})
}))

module.exports=vendorApp;