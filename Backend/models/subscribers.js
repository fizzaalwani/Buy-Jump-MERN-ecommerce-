const mongoose=require('mongoose')


const subscriberSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    }
})

module.exports=mongoose.mongoose.model('subscriber',subscriberSchema)