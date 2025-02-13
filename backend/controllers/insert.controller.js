const Doctor = require("../models/doctor.model");

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

module.exports = { insertDoctors };
