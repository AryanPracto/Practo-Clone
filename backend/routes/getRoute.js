const express=require("express");
const {fetchDoctors}=require("../controllers/fetch.controller.js")

const router=express.Router();

router.get("/doctors/:post",fetchDoctors);

module.exports=router;