const exp=require('express');
const userApp=exp.Router();
const userModel=require('../models/userModel');
const workerModel=require('../models/workerModel');
const expressAsyncHandler=require('express-async-handler');
const { sendOTP } = require('../utils/smsService');
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

// Check if user exists by mobile number
userApp.get('/check-user/:mobileNumber', expressAsyncHandler(async (req, res) => {
    const { mobileNumber } = req.params;

    if (!mobileNumber) {
        return res.status(400).send({ message: 'Mobile number is required' });
    }

    try {
        // Find user by mobile number
        const user = await userModel.findOne({ mobileNumber });

        // Return whether user exists or not
        res.status(200).send({
            exists: !!user,
            message: user ? 'User found' : 'User not found'
        });
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).send({ message: 'Failed to check user', error: error.message });
    }
}));

// Send OTP
userApp.post('/send-otp', expressAsyncHandler(async (req, res) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
        return res.status(400).send({ message: 'Mobile number is required' });
    }

    try {
        // Find user by mobile number
        let user = await userModel.findOne({ mobileNumber });

        if (!user) {
            return res.status(404).send({ message: 'User not found. Please register first.' });
        }

        // Generate OTP
        const otp = user.generateOTP();
        await user.save();

        // Send OTP via SMS
        try {
            const smsResult = await sendOTP(mobileNumber, otp);
            console.log(`OTP for ${mobileNumber}: ${otp}`);

            // Always include OTP in development mode
            const config = require('../config/config');
            const isDevMode = config.environment !== 'production';

            res.status(200).send({
                message: 'OTP sent successfully',
                // Always include OTP for testing purposes
                otp: otp,
                // Include SMS status
                smsStatus: smsResult.success ? 'sent' : 'simulated'
            });
        } catch (smsError) {
            console.error('Error sending SMS:', smsError);

            // Even if SMS fails, return the OTP for testing
            res.status(200).send({
                message: 'OTP generated but SMS sending failed',
                otp: otp,
                smsStatus: 'failed',
                error: smsError.message
            });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send({ message: 'Failed to send OTP', error: error.message });
    }
}));

// Verify OTP
userApp.post('/verify-otp', expressAsyncHandler(async (req, res) => {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
        return res.status(400).send({ message: 'Mobile number and OTP are required' });
    }

    try {
        // Find user by mobile number
        const user = await userModel.findOne({ mobileNumber });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Verify OTP
        const isValid = user.verifyOTP(otp);

        if (!isValid) {
            return res.status(400).send({ message: 'Invalid or expired OTP' });
        }

        // Save the user with updated verification status
        await user.save();

        res.status(200).send({
            message: 'OTP verified successfully',
            payload: user
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).send({ message: 'Failed to verify OTP', error: error.message });
    }
}));

// Resend OTP
userApp.post('/resend-otp', expressAsyncHandler(async (req, res) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
        return res.status(400).send({ message: 'Mobile number is required' });
    }

    try {
        // Find user by mobile number
        let user = await userModel.findOne({ mobileNumber });

        if (!user) {
            return res.status(404).send({ message: 'User not found. Please register first.' });
        }

        // Check if we can resend OTP (if previous OTP was sent more than 1 minute ago)
        const config = require('../config/config');
        const now = new Date();
        const lastOtpTime = user.otp && user.otp.expiresAt
            ? new Date(user.otp.expiresAt.getTime() - config.otp.expiryTime)
            : null;

        if (lastOtpTime && (now - lastOtpTime) < config.otp.resendDelay) {
            const timeToWait = Math.ceil((config.otp.resendDelay - (now - lastOtpTime)) / 1000);
            return res.status(429).send({
                message: `Please wait ${timeToWait} seconds before requesting a new OTP`,
                retryAfter: timeToWait
            });
        }

        // Generate new OTP
        const otp = user.generateOTP();
        await user.save();

        // Send OTP via SMS
        try {
            const smsResult = await sendOTP(mobileNumber, otp);
            console.log(`New OTP for ${mobileNumber}: ${otp}`);

            // Always include OTP in development mode
            const isDevMode = config.environment !== 'production';

            res.status(200).send({
                message: 'New OTP sent successfully',
                // Always include OTP for testing purposes
                otp: otp,
                // Include SMS status
                smsStatus: smsResult.success ? 'sent' : 'simulated'
            });
        } catch (smsError) {
            console.error('Error sending SMS:', smsError);

            // Even if SMS fails, return the OTP for testing
            res.status(200).send({
                message: 'New OTP generated but SMS sending failed',
                otp: otp,
                smsStatus: 'failed',
                error: smsError.message
            });
        }
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).send({ message: 'Failed to resend OTP', error: error.message });
    }
}));

module.exports=userApp;