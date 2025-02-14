const express=require("express");
const {fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience}=require("../controllers/fetch.controller.js")

const router=express.Router();

router.get("/doctors/:post",fetchDoctors);
router.get("/doctors/:post/:gender",fetchDoctorsByGender);
router.get("/doctors/:post/experience/:exp", fetchDoctorsByExperience);

module.exports=router;