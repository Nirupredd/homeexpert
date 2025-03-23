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
// schema for address
const shop=new mongoose.Schema({

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
// model for user

const shopKeeperSchema = new mongoose.Schema({
  shopKeeperId: { type: String, default: generateTimestampId, unique: true,immutable: true},
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
    required:true,
    lowercase: true,
  },
  shopName:{
    type:String,
    required:true 
  },
  shopAddress:{
    type:shop,
    required:true
  }
});

const ShopKeeper=mongoose.model('shopkeeper',shopKeeperSchema);

module.exports=ShopKeeper;