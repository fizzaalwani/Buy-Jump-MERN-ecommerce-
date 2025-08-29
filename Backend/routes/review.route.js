const express=require('express')
const { addReview, getReview, approveReview } = require('../controllers/review.contoller')
const router=express.Router()

//reviews
router.post('/add',addReview)
router.get('/get/:productId',getReview)
router.get('/approve/:reviewId',approveReview )

module.exports=router