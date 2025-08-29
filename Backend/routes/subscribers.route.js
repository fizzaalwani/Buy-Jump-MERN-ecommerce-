const express=require('express')
const { addSubscriber, sendEmail } = require('../controllers/subscribers.controller')
const router=express.Router()

//add subscribers
router.post('/add',addSubscriber)
router.post('/sendMail', sendEmail)


module.exports=router