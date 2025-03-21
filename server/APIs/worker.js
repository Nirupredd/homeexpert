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

workerApp.put('/workerupdate/:mobileNumber', expressAsyncHandler(async (req, res) => {
  console.log("Replacing worker:", req.params.mobileNumber);
  // Find and replace worker by mobile number
  const updatedWorker = await workerModel.findOneAndReplace(
      { mobileNumber: req.params.mobileNumber },  // Find worker by mobileNumber
      req.body,  // Replace with full new object
      { new: true }  // Return updated worker
  );
  if (!updatedWorker) {
      return res.status(404).send({ message: "Worker not found" });
  }
  res.status(200).send({ message: "Worker modified successfully", payload: updatedWorker });
}));



//delete worker by id
workerApp.delete('/workerid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await workerModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"worker deleted",payload:d_id})
}))

//delete worker by phonenumber
workerApp.delete('/workerph/:mobileNumber',expressAsyncHandler(async(req,res)=>{
   const delete_id=await workerModel.findOneAndDelete({mobileNumber:req.params.mobileNumber})
   res.status(201).send({message:"worker deleted ",payload:delete_id})
}))



module.exports=workerApp;