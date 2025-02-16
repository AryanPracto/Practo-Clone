const express=require("express");
const {fetchSlotById,fetchUserById,fetchAppointment,fetchClinicById,fetchSlots,fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience,fetchDoctorsById, fetchClinicsByDoctorId, fetchUserId}=require("../controllers/fetch.controller.js")

const router=express.Router();

router.get("/doctors/:post",fetchDoctors);
router.get("/doctors/:post/:gender",fetchDoctorsByGender);
router.get("/doctors/:post/experience/:exp", fetchDoctorsByExperience);
router.get("/doctor/id/:id",fetchDoctorsById);
router.get("/clinics/:doctorId",fetchClinicsByDoctorId)
router.get("/slots",fetchSlots)
router.post("/userId",fetchUserId);
router.get("/clinic/:id",fetchClinicById);
router.get("/appointment/:appointmentId",fetchAppointment)
router.get("/user/:id",fetchUserById)
router.get('/slot/:id',fetchSlotById)

module.exports=router;