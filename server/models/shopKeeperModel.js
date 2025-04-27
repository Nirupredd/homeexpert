const mongoose=require('mongoose');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'IN'); // Change 'IN' to default country if needed
    return phoneNumber ? phoneNumber.isValid() : false;
};

const shopItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: [String], required: true },
  imageUrl: { type: String, required: true,unique: true},
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  rating:{type:Number,default:0,min:0,max:5}
});

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
  },
    products:{
      type:[shopItemSchema],
      unique:true
    }
});

const ShopKeeper=mongoose.model('shopkeeper',shopKeeperSchema);

module.exports=ShopKeeper;