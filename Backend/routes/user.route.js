const express=require('express')
const { signup, login } = require('../controllers/user.controller')
const  limiter  = require('../utils/rate-limiter')
const router=express.Router()

//Endpoints for  users
router.post("/signup",limiter,signup)
router.post('/login',limiter,login )


module.exports=router