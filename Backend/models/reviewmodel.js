const mongoose=require('mongoose')


const reviewSchema=mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    name:{type:String},
    email:{
        type:String,
        trim:true
    },
    review:{
         type:String,
        required:true,
    },
    approved:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number
    }
})

module.exports=mongoose.model("review",reviewSchema)