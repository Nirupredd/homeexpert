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

//get worker by worker id
workerApp.get('/worker/:_id',expressAsyncHandler(async(req,res)=>{
    console.log(req.params._id);
    const workers=await workerModel.findOne({_id:req.params._id});
    res.status(201).send({message:"workers",payload:workers})
}))
// update worker by id
workerApp.put('/workerupdate/:id', expressAsyncHandler(async (req, res) => {
  console.log("Replacing worker:", req.params.id);
  // Find and replace worker by worker id
  const updatedWorker = await workerModel.findOneAndReplace(
      { _id: req.params.id},  // Find worker by _Id
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




module.exports=workerApp;