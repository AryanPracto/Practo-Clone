const Doctor = require("../models/doctor.model");

const fetchDoctors=async(req,res)=>{
    try {
        const {post}=req.params;

        if (!post) {
            return res.status(400).json({ error: "Doctor post is required" });
          }
      
          // Find all doctors with the given post
          const doctors = await Doctor.findAll({
            where: { post },
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

module.exports={fetchDoctors}