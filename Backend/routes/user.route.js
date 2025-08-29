const express=require('express')
const { signup, login } = require('../controllers/user.controller')
const router=express.Router()

//Endpoints for  users
router.post("/signup",signup)
router.post('/login',login )


module.exports=router