const mongoose=require('mongoose');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { v4: uuidv4 } = require('uuid');
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'IN'); // Change 'IN' to default country if needed
    return phoneNumber ? phoneNumber.isValid() : false;
};
function generateTimestampId() {
  const timestamp = Date.now().toString().slice(-4); // Get last 4 digits of timestamp
  const uuidPart = uuidv4().replace(/[^0-9]/g, '').substring(0, 2); // Extract 2 digits
  return timestamp + uuidPart; // Combine to make 6 digits
}
// model for user

const deliverySchema = new mongoose.Schema({
  deliveryPersonId: { type: String, default: generateTimestampId, unique: true,immutable: true},
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
  }
});

const delivery=mongoose.model('deliveryperson',deliverySchema,"deliverypersons");

module.exports=delivery;