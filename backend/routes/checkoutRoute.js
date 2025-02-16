const express=require('express');
const { handleCheckout } = require('../controllers/checkout.controller');
const router=express.Router();

router.post('/booking',handleCheckout);

module.exports=router;