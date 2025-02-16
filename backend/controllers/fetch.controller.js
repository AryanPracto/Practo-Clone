const Doctor = require("../models/doctor.model.js");
const { Op } = require("sequelize");
const Clinic=require('../models/clinic.model.js')
const Slot=require('..//models/slot.model.js')
const jwt=require('jsonwebtoken')
import axios from "axios"
import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";

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
    // For now, let's just send the JSON data instead of rendering
    res.json(doctor);
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

const fetchSlots=async(req,res)=>{
  try {
    const { doctorId, clinicId, date } = req.query;
    
    const slots = await Slot.findAll({
      where: {
        doctorId,
        clinicId,
        date,
        status: "Available" // Only get available slots
      },
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ]
    });

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching slots" });
  }
}

const fetchUserId = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token is required' });
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract userId from decoded token
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ userId: user.id, user }); // Send both userId and user data
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const fetchClinicById=async(req,res)=>{
  const {id}=req.params;
  console.log(id)
  try {
    const clinic=await Clinic.findOne({where:{id:id}});
    res.json({clinic:clinic});
  } catch (error) {
    res.status(401).json({error:"Invalid id"})
  }
}

const fetchAppointment = async (req, res) => {
  console.log("Request Params:", req.params); // Debugging

  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res.status(400).json({ message: "Appointment ID is required" });
  }

  try {
    const appointment = await Appointment.findOne({ where: { id:appointmentId } });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ appointment });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchUserById=async(req,res)=>{
  const {id}=req.params
  try {
    const user=await User.findOne({where:{id:id}});
    res.json({user:user})
  } catch (error) {
    console.log(error);
  }
}

const fetchSlotById=async(req,res)=>{
  const {id}=req.params;
  try {
    const slot=await Slot.findOne({where:{id:id}});
    res.json({slot:slot}) 
  } catch (error) {
    console.log(error)
  }
}

module.exports={fetchSlotById,fetchUserById,fetchAppointment,fetchClinicById,fetchSlots,fetchUserId,fetchDoctors,fetchDoctorsByGender,fetchDoctorsByExperience,fetchDoctorsById,fetchClinicsByDoctorId}