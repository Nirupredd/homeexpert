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



module.exports=shopKeeperApp;