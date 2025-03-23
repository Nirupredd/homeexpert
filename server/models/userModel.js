const mongoose=require('mongoose');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { v4: uuidv4 } = require('uuid');
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'IN'); // Change 'IN' to default country if needed
    return phoneNumber ? phoneNumber.isValid() : false;
};
function generateShortId() {
  const objectId = new mongoose.Types.ObjectId().toString(); // Generate a new ObjectId
  const numericPart = objectId.replace(/\D/g, '').slice(0, 6); // Extract first 6 digits
  return numericPart;
}

// model for user
const bulinfo=new mongoose.Schema({
    flatNO:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    }

})
const userAdd=new mongoose.Schema({
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Pincode must be exactly 6 digits"],
    },
    address:{
        type:bulinfo,
        required:true
    }
})
const userSchema = new mongoose.Schema({
  userId: { type: String, default:generateShortId, unique: true,immutable: true},
  profileImg:{
        type: String
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
  Address:{
    type:userAdd,
    required:true
  }
}, { timestamps: true});

const User=mongoose.model('user',userSchema);

module.exports=User;