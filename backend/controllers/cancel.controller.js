const Appointment=require('../models/appointment.model.js');
const Slot=require('../models/slot.model.js');

const cancelAppointment=async(req,res)=>{
    try {
        const {appointmentId}=req.params
        const appointment=await Appointment.findOne({where:{id:appointmentId}});
        const slot=await Slot.findOne({where :{id:appointment.slotId}});
        slot.status="Available";
        appointment.status="Cancelled";
        await appointment.update({ status: 'Cancelled' });
        await slot.update({ status: 'available' });

        return res.status(201).json({message:"appointment successfully cancelled"})
    } catch (error) {
        console.error('Error canceling appointment:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports={cancelAppointment};