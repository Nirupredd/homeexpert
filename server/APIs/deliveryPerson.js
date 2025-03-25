const exp=require('express');
const deliveryPersonApp=exp.Router();
const deliveryPersonModel=require('../models/deliveryPersonModel');
const expressAsyncHandler=require('express-async-handler');
// post the deliveryPerson
deliveryPersonApp.post('/deliveryPerson',expressAsyncHandler(async(req,res)=>{
    //bussiness logic 
     //get deliveryPerson or author
     const deliveryPerson=req.body;
    //  find deliveryPerson by email id
      let newdeliveryPerson=new deliveryPersonModel(deliveryPerson);
      let newdeliveryPersonDoc=await newdeliveryPerson.save();
      res.status(201).send({message:newdeliveryPersonDoc.role,payload:newdeliveryPersonDoc})
}));
// update deliveryPerson by id
deliveryPersonApp.put('/deliveryPersonupdate/:id', expressAsyncHandler(async (req, res) => {
  console.log("Replacing deliveryPerson:", req.params.id);
  // Find and replace deliveryPerson by deliveryPerson id
  const updateddeliveryPerson = await deliveryPersonModel.findOneAndReplace(
      { _id: req.params.id},  // Find deliveryPerson by deliveryPersonId
      req.body,  // Replace with full new object
      { new: true }  // Return updated deliveryPerson
  );
  if (!updateddeliveryPerson) {
      return res.status(404).send({ message: "deliveryPerson not found" });
  }
  res.status(200).send({ message: "deliveryPerson modified successfully", payload: updateddeliveryPerson });
}));


//get all deliverypersons
deliveryPersonApp.get('/deliveryPersons',expressAsyncHandler(async(req,res)=>{
  const delpersons=await deliveryPersonModel.find();
  res.status(201).send({message:"delivery persons",payload:delpersons})
  }))

//get all deliverypersons by id
deliveryPersonApp.get('/deliveryperson/:deliveryPersonId',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.deliveryPersonId);
    const delpersons=await deliveryPersonModel.findOne({deliveryPersonId:req.params.deliveryPersonId});
    res.status(201).send({message:"delivery persons",payload:delpersons})
}))

//delete deliveryPerson by id
deliveryPersonApp.delete('/deliverypersonid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await deliveryPersonModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"Delivery Person deleted",payload:d_id})
}))


module.exports=deliveryPersonApp;