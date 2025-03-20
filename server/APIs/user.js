const exp=require('express');
const userApp=exp.Router();
const userModel=require('../models/userModel');
const workerModel=require('../models/workerModel');
const expressAsyncHandler=require('express-async-handler');
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

//get req  by phone number
userApp.get('/user/:mobileNumber',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.mobileNumber);
    const users=await userModel.findOne({mobileNumber:req.params.mobileNumber});
    res.status(201).send({message:"users",payload:users})
}))
userApp.put('',expressAsyncHandler((req,res)=>{

}))

//delete user by id
userApp.delete('/userid/:_id',expressAsyncHandler(async(req,res)=>{
    const d_id=await userModel.findByIdAndDelete(req.params._id)
    res.status(201).send({message:"User deleted",payload:d_id})
}))

//delete user by phonenumber
userApp.delete('/userph/:mobileNumber',expressAsyncHandler(async(req,res)=>{
     const delete_id=await userModel.findOneAndDelete({mobileNumber:req.params.mobileNumber})
     res.status(201).send({message:"User deleted ",payload:delete_id})
}))
// post a review 
userApp.post('/userreview',expressAsyncHandler(async(req,res)=>{
    //business logic(get user )
    
}));


module.exports=userApp;