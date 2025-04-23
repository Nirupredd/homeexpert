const express = require('express');
const worksApp = express.Router();
const worksModel = require('../models/worksModel');
const expressAsyncHandler = require('express-async-handler');

// GET all shop items
worksApp.get('/works', expressAsyncHandler(async (req, res) => {
  // Fetch all works from the database
  const works = await worksModel.find();
  res.status(200).send({ message: "works fetched successfully", payload: works });
}));

// GET a single work by ID
worksApp.get('/work/:_id',expressAsyncHandler(async(req,res)=>{
    console.log(req.params._id);
    const work=await worksModel.findOne({_id:req.params._id});
    res.status(201).send({message:"work fetched successfully ",payload:work})
}))

// GET a single work by NAME (from the name array)
worksApp.get('/work/name/:name', expressAsyncHandler(async (req, res) => {
    const workName = req.params.name;
    const workI = await worksModel.findOne({ name: { $in: [workName] } });
    if (!workI) {
      return res.status(404).send({ message: "worknot found" });
    }
    res.status(201).send({ message: "workfetched successfully", payload: workI });
}));



module.exports = worksApp;