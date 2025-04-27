const mongoose=require('mongoose');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'IN'); // Change 'IN' to default country if needed
    return phoneNumber ? phoneNumber.isValid() : false;
};


// model for user

const deliverySchema = new mongoose.Schema({
  profileImg:{
        type: String,
        unique:true
     },
  mobileNumber:{
     type:String,
     unique:true,
     required:true,
     validate: {
        validator: validatePhoneNumber,
        message: props => `${props.value} is not a valid phone number!`
    }
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  dob:{
    type:Date,
    required:true
  },
  vechicle:{
    type:Boolean,
    required:true
  },
  rating:{
    type:Number,
    default:0,
    min:0,
    max:5
  }

});

const delivery=mongoose.model('deliveryperson',deliverySchema,"deliverypersons");

module.exports=delivery;