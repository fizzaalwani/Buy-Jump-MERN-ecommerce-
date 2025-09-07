const express=require('express')
const { create, get, update, valid } = require('../controllers/voucher.controller')
const router=express.Router()

router.post('/create',create)
router.get('/get',get)
router.post('/update',update)
router.get('/isValid/:id',valid)


module.exports=router