const mongoose = require('mongoose')


const voucherSchema = mongoose.Schema({
 code:{
    type:String,
    required:true,
    unique:true
 },
 expiryDate:{
    type:Date,
    required:true
 },
 discount:{
    type:Number,
    required:true
 }
}, { timestamps: true })

module.exports=mongoose.model("voucher",voucherSchema)