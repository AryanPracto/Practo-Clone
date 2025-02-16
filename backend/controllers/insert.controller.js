const Doctor = require("../models/doctor.model.js");
const Clinic=require('../models/clinic.model.js');
const DoctorClinic=require('../models/doctor_clinic.model.js')
const Slot=require('../models/slot.model.js')
const Story=require('../models/story.model.js')

// Function to insert a doctor
const insertDoctors = async (req, res) => {
  try {
    // Extract doctor details from request body
    const { name, specialization, post, experience, gender, description,image,doctor_index } = req.body;

    // Check if all required fields are provided
    if (!name || !specialization || !post || !experience || !gender || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert the doctor into the database
    const doctor = await Doctor.create({
      name,
      specialization,
      post,
      experience,
      gender,
      description,
      image,
      doctor_index
    });

    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error inserting doctor:", error);
    res.status(500).json({ message: "Failed to add doctor", error: error.message });
  }
};

const insertClinic = async (req, res) => {
  try {
    const {
      name,
      location,
      workingDays,
      openingTime,
      closingTime,
      fee,
      rating
    } = req.body;

    // Validate required fields
    if (!name || !location || !workingDays || !openingTime || !closingTime || fee === undefined || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, location, workingDays, openingTime, closingTime, fee, rating) are required."
      });
    }

    // Create the clinic record
    const clinic = await Clinic.create({
      name,
      location,
      workingDays,
      openingTime,
      closingTime,
      fee,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Clinic created successfully",
      clinic,
    });
  } catch (error) {
    console.error("Error inserting clinic:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const insertDocClinic = async (req, res) => {
  try {
    const { doctorId, clinicId } = req.body;

    // Validate that both doctorId and clinicId are provided
    if (!doctorId || !clinicId) {
      return res.status(400).json({
        success: false,
        message: "Both doctorId and clinicId are required."
      });
    }

    // Create a new record in the DoctorClinic table
    const docClinic = await DoctorClinic.create({ doctorId, clinicId });

    return res.status(201).json({
      success: true,
      message: "Doctor and clinic mapping created successfully.",
      docClinic
    });
  } catch (error) {
    console.error("Error inserting doctor-clinic mapping:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

const insertSlot = async (req, res) => {
  try {
    const { doctorId, clinicId, date, time, status } = req.body;

    // Basic validation
    if (!doctorId || !clinicId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'doctorId, clinicId, date, and time are required.',
      });
    }

    // Create the slot
    const newSlot = await Slot.create({
      doctorId,
      clinicId,
      date,
      time,
      status: status || 'Available', // fallback if status not provided
    });

    return res.status(201).json({
      success: true,
      message: 'Slot created successfully',
      slot: newSlot,
    });
  } catch (error) {
    console.error('Error creating slot:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const insertStory=async(req,res)=>{
  try {
    const { userName, title, content, doctorId } = req.body;

    // Validate required fields
    if (!userName || !title || !content || !doctorId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newStory = await Story.create({
        userName,
        title,
        content,
        doctorId,
    });

    res.status(201).json({ message: "Story added successfully", story: newStory });
} catch (error) {
    console.error("Error adding story:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}

module.exports = { insertDoctors,insertClinic,insertDocClinic,insertSlot,insertStory };
