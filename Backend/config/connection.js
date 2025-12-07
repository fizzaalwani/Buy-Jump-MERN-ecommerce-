const mongoose=require('mongoose')
require("dotenv").config();

console.log("ENV MONGODB URL :",process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("database connected successfully")).catch((err)=>console.log(err.message))