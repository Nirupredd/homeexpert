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

//get all deliverypersons
deliveryPersonApp.get('/deliveryPersons',expressAsyncHandler(async(req,res)=>{
  const delpersons=await deliveryPersonModel.find();
  res.status(201).send({message:"delivery persons",payload:delpersons})
  }))

//get all deliverypersons by phonenumber
deliveryPersonApp.get('/deliveryperson/:mobileNumber',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.mobileNumber);
    const delpersons=await deliveryPersonModel.findOne({mobileNumber:req.params.mobileNumber});
    res.status(201).send({message:"delivery persons",payload:delpersons})
}))


module.exports=deliveryPersonApp;