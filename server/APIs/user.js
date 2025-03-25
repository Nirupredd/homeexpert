
const exp=require('express');
const userApp=exp.Router();

const userModel=require('../models/userModel');
const workerModel=require('../models/workerModel');
const expressAsyncHandler=require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
// post the user
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //bussiness logic 
     //get user or author
     const user=req.body;
     //find user by email id
      let newUser=new userModel(user);
      let newUserDoc=await newUser.save();
      res.status(201).send({message:newUserDoc.role,payload:newUserDoc})
}));

//get all users
userApp.get('/users',expressAsyncHandler(async(req,res)=>{
const users=await userModel.find();
res.status(201).send({message:"users",payload:users})
}))

//get req  by user id
userApp.get('/user/:id',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.id);
    const users=await userModel.findOne({_id:req.params.id});
    res.status(201).send({message:"users",payload:users})
}))
// update user by id
userApp.put('/userupdate/:id', expressAsyncHandler(async (req, res) => {
    console.log("Replacing user:", req.params.id);
    // Find and replace user by user id
    const updateduser = await userModel.findOneAndReplace(
        { _id: req.params.id},  // Find user by userId
        req.body,  // Replace with full new object
        { new: true }  // Return updated user
    );
    if (!updateduser) {
        return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ message: "user modified successfully", payload: updateduser });
  }));
//delete user by id
userApp.delete('/userid/:_id',expressAsyncHandler(async(req,res)=>{
    const d_id=await userModel.findByIdAndDelete(req.params._id)
    res.status(201).send({message:"User deleted",payload:d_id})
}))

// post a review 
userApp.post('/userreview/:userId/:workerId',expressAsyncHandler(async(req,res)=>{
    //business logic(get user by userId)
    // post  
    //get worker by workerId(post with fields rating,comment,userId,)
    const userId=req.params.userId;
    const workerId=req.params.workerId;
    const review=req.body;
    let user=await userModel.findById(userId);
    let worker=await workerModel.findById(workerId);
    if(!user||!worker){
        return res.status(404).send({message:"User or worker not found"})
    }
    console.log(worker.reviews,worker);
    review.userId=userId;
    worker.reviews.push(review);
    const newWorker=await workerModel(worker);
    let newReviewDoc=await newWorker.save();
    res.status(201).send({message:"Review posted successfully",payload:newReviewDoc})
}));

// DELETE a review 

userApp.delete('/userdelete/:userId/:workerId/:reviewId',expressAsyncHandler(async(req,res)=>{
    const userId=req.params.userId;
    const workerId=req.params.workerId;
    const reviewId=req.params.reviewId;
    let user=await userModel.findById(userId);
    let worker=await workerModel.findById(workerId);
    if(!user||!worker){
        return res.status(404).send({message:"User or worker not found"})
    }
    worker.reviews=worker.reviews.filter((review)=>review._id!=reviewId);
    const newWorker=await workerModel(worker);
    let newReviewDoc=await newWorker.save();
    res.status(201).send({message:"Review deleted successfully",payload:newReviewDoc})
}));

module.exports=userApp;