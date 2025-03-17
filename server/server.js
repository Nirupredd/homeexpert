const exp =require("express")
const app=exp()
require('dotenv').config();
const mongoose =require("mongoose");
const userApp = require("./APIs/user.js");
const shopApp = require("./APIs/shopkeeper.js");
const workerApp=require("./APIs/worker.js")
const cors=require('cors')
app.use(cors())
const port=process.env.PORT || 4000

//data base connection
mongoose.connect(process.env.DBURL)
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

//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler:",err)
    res.send({message:err.message})
})