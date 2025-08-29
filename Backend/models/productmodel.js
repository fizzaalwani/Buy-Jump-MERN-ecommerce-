const mongoose=require('mongoose')

let productSchema=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:[String],
    old_price:{
        type:Number,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
   available:{
    type:Boolean,
    default:true
   }
})

module.exports=mongoose.model('product',productSchema)