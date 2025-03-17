const exp=require('express');
const userApp=exp.Router();
const userModel=require('../models/userModel');
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

userApp.get('/users',expressAsyncHandler(async(req,res)=>{
const users=await userModel.find();
res.status(201).send({message:"users",payload:users})
}))
userApp.get('/user/:mobileNumber',expressAsyncHandler(async(req,res)=>{
    console.log(req.params.mobileNumber);
    const users=await userModel.findOne({mobileNumber:req.params.mobileNumber});
    res.status(201).send({message:"users",payload:users})
}))
userApp.put('',expressAsyncHandler((req,res)=>{

}))

module.exports=userApp;