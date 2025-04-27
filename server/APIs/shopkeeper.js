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
// update shopkeeper by id
shopKeeperApp.put('/shopKeeperupdate/:id', expressAsyncHandler(async (req, res) => {
  console.log("Replacing shopKeeper:", req.params.id);
  // Find and replace shopKeeper by shopKeeper id
  const updatedshopKeeper = await shopKeeperModel.findOneAndReplace(
      { _id: req.params.id },  // Find shopKeeper by shopKeeperId
      req.body,  // Replace with full new object
      { new: true }  // Return updated shopKeeper
  );
  if (!updatedshopKeeper) {
      return res.status(404).send({ message: "shopKeeper not found" });
  }
  res.status(200).send({ message: "shopKeeper modified successfully", payload: updatedshopKeeper });
}));


//get all shopkeepers
shopKeeperApp.get('/shopkeepers',expressAsyncHandler(async(req,res)=>{
  const shoppersons=await shopKeeperModel.find();
  res.status(201).send({message:"shopkeeper persons",payload:shoppersons})
  }))

//get shopkeeper by id
shopKeeperApp.get('/shopkeeper/:id',expressAsyncHandler(async(req,res)=>{
  console.log(req.params.id);
  const shopkeeper=await shopKeeperModel.findOne({_id:req.params.id});
  res.status(201).send({message:"shopkeepers",payload:shopkeeper})
}))

//delete shopkeeper by id
shopKeeperApp.delete('/shopkeeperid/:_id',expressAsyncHandler(async(req,res)=>{
  const d_id=await shopKeeperModel.findByIdAndDelete(req.params._id)
  res.status(201).send({message:"Shop Kepper deleted",payload:d_id})
}))

// post a new product details 

shopKeeperApp.post('/product/:shopKeeperId', expressAsyncHandler(async (req, res) => {
    const shopKeeperId = req.params.shopKeeperId;
    const newProduct = req.body;
    console.log(shopKeeperId, newProduct)

    let shopKeeper = await shopKeeperModel.findById(shopKeeperId);
    if (!shopKeeper) {
        return res.status(404).send({ message: "ShopKeeper not found" });
    }

    // Check if product with the same imageUrl already exists
    const isDuplicate = shopKeeper.products.some(product => product.imageUrl === newProduct.imageUrl);

    if (isDuplicate) {
        return res.status(400).send({ message: "Duplicate product already exists." });
    }

    // Add the new product
    shopKeeper.products.push(newProduct);

    // Save updated shopKeeper document
    await shopKeeper.save();

    res.status(201).send({ message: "Product posted successfully", payload: newProduct });
}));
//update product details
shopKeeperApp.put('/productChange/:shopKeeperId/:productId/:quantity/:price', expressAsyncHandler(async (req, res) => {
  const { shopKeeperId, productId, quantity, price } = req.params;

  let shopKeeper = await shopKeeperModel.findById(shopKeeperId);
  
  if (!shopKeeper) {
      return res.status(404).send({ message: "ShopKeeper not found" });
  }

  // Find the product inside the shopKeeper's products array
  const productIndex = shopKeeper.products.findIndex(product => product._id.toString() === productId);
  
  if (productIndex === -1) {
      return res.status(404).send({ message: "Product not found" });
  }

  // Update product details
  shopKeeper.products[productIndex].quantity = parseInt(quantity, 10);
  shopKeeper.products[productIndex].price = parseFloat(price);

  // Save the updated shopKeeper document
  await shopKeeper.save();

  res.status(200).send({ message: "Product updated successfully", payload: shopKeeper.products[productIndex] });
}));



module.exports=shopKeeperApp;