const express=require("express");
const {fetchSlots,fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience,fetchDoctorsById, fetchClinicsByDoctorId}=require("../controllers/fetch.controller.js")

const router=express.Router();

router.get("/doctors/:post",fetchDoctors);
router.get("/doctors/:post/:gender",fetchDoctorsByGender);
router.get("/doctors/:post/experience/:exp", fetchDoctorsByExperience);
router.get("/doctor/id/:id",fetchDoctorsById);
router.get("/clinics/:doctorId",fetchClinicsByDoctorId)
router.get("/slots",fetchSlots)

module.exports=router;