const Doctor = require("../models/doctor.model.js");
const { Op } = require("sequelize");
const Clinic=require('../models/clinic.model.js')

const fetchDoctors=async(req,res)=>{
    try {
        const {post}=req.params;

        if (!post) {
            return res.status(400).json({ error: "Doctor post is required" });
          }
      
          // Find all doctors with the given post
          const doctors = await Doctor.findAll({
            where: { doctor_index:post },
          });
      
          if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this post" });
          }
      
          res.status(200).json(doctors);

    } catch (error) {
        console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

const fetchDoctorsByGender = async (req, res) => {
  try {
    const { post, gender } = req.params; // Extract from URL

    // Validate parameters
    if (!post || !gender) {
      return res.status(400).json({ error: 'Post and gender are required' });
    }

    // Query database for doctors matching post and gender
    const doctors = await Doctor.findAll({
      where: { doctor_index: post, gender: gender },
    });

    // Return response
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for the given criteria' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const fetchDoctorsByExperience = async (req, res) => {
  try {
    const { post, exp } = req.params; // Extract from URL

    // Validate parameters
    if (!post || isNaN(exp)) {
      return res.status(400).json({ error: 'Valid post and experience are required' });
    }
    console.log(exp);
    // Query database for doctors matching post with experience greater than specified
    const doctors = await Doctor.findAll({
      where: {
        doctor_index: post, // Ensure column name matches DB
        experience: { [Op.gt]: exp }, // Correct Sequelize syntax
      },
    });

    // Return response
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found with experience greater than specified value' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchDoctorsById=async(req,res)=>{
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findOne({ where: { id } });

    if (!doctor) {
      console.log('No doctor found for ID:', id); // Add this debug log
      return res.status(404).send('Doctor not found');
    }

    const doctorData = doctor.toJSON();
    // For now, let's just send the JSON data instead of rendering
    res.json(doctorData);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).send('Server error');
  }
}

const fetchClinicsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    // Find the doctor by ID
    const doctor = await Doctor.findOne({ where: { id: doctorId } });
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    // Use the generated association method to get clinics
    const clinics = await doctor.getClinics();
    
    res.status(200).json(clinics);
  } catch (error) {
    console.error("Error fetching clinics for doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports={fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience,fetchDoctorsById,fetchClinicsByDoctorId}