const exp =require("express")
const app=exp()
require('dotenv').config();
const mongoose =require("mongoose");
const userApp = require("./APIs/user.js");
const shopApp = require("./APIs/shopkeeper.js");
const workerApp=require("./APIs/worker.js")
const deliveryApp=require("./APIs/deliveryPerson.js");
const shopItemsApp=require("./APIs/shopItems.js");
const shopGoodsApp=require("./APIs/shopGoods.js")
const vendorApp = require("./APIs/Vendor.js");
const worksApp=require("./APIs/works.js")
const cors=require('cors');
app.use(cors())
const port=process.env.PORT || 4000

//data base connection
mongoose.connect(process.env.DB_URL)
.then(
    ()=>{app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("Data Base Connection Success")
}
)
.catch(err=>console.log("Error in DB Connection",err))

//body parser middleware
app.use(exp.json())
//API routes
app.use('/user-api',userApp)
app.use('/shopkeeper-api',shopApp)
app.use('/worker-api',workerApp)
app.use('/delivery-api',deliveryApp)
app.use('/shopitems-api',shopItemsApp)
app.use('/shopgoods-api',shopGoodsApp)
app.use('/vendor-api',vendorApp)
app.use('/works-api',worksApp)
// error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler:",err)
    res.send({message:err.message})
})