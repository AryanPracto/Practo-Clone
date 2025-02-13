const express=require("express");
const {insertDoctors}=require("../controllers/insert.controller")

const router=express.Router();

router.post("/doctors",insertDoctors);

module.exports=router;