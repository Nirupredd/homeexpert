const exp=require('express');
const workerApp=exp.Router();
const workerModel=require('../models/workerModel');
const expressAsyncHandler=require('express-async-handler');
// post the worker
workerApp.post('/worker',expressAsyncHandler(async(req,res)=>{
    //bussiness logic 
     //get worker or author
     const worker=req.body;
    //  find worker by email id
      let newworker=new workerModel(worker);
      let newworkerDoc=await newworker.save();
      res.status(201).send({message:newworkerDoc.role,payload:newworkerDoc})
}));

//get all workers
workerApp.get('/workers',expressAsyncHandler(async(req,res)=>{
    const workers=await workerModel.find();
    res.status(201).send({message:"workers",payload:workers})
}))

//get worker by phone number
workerApp.get('/worker/:mobileNumber',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.mobileNumber);
    const workers=await workerModel.findOne({mobileNumber:req.params.mobileNumber});
    res.status(201).send({message:"workers",payload:workers})
}))

module.exports=workerApp;