const express=require("express");
const {insertDoctors,insertClinic,insertDocClinic, insertSlot}=require("../controllers/insert.controller")

const router=express.Router();

router.post("/doctors",insertDoctors);
router.post("/clinic",insertClinic);
router.post("/doctor-clinic",insertDocClinic)
router.post("/slot",insertSlot)

module.exports=router;