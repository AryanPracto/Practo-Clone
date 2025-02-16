const express=require("express");
const {insertDoctors,insertClinic,insertDocClinic, insertSlot,insertStory}=require("../controllers/insert.controller")

const router=express.Router();

router.post("/doctors",insertDoctors);
router.post("/clinic",insertClinic);
router.post("/doctor-clinic",insertDocClinic)
router.post("/slot",insertSlot)
router.post("/story",insertStory)

module.exports=router;