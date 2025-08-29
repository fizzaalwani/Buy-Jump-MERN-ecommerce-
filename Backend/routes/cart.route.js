const express=require('express')
const verifyUser=require('../middlewares/auth.middleware')
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cart.controller')
const router=express.Router()

router.post('/add', verifyUser, addToCart)
router.post('/remove', verifyUser, removeFromCart)
router.get('/get', verifyUser, getCartItems)

module.exports = router;
