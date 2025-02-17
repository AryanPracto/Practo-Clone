const express=require('express');
const { cancelAppointment } = require('../controllers/cancel.controller');
const router=express.Router();

router.get('/appointment/:appointmentId',cancelAppointment)

module.exports=router