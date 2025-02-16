import React, { useEffect } from "react";
import './AppointmentBox.css'

const AppointmentDetails = ({ doctor, clinic, date, time }) => {
    useEffect(()=>{
        // console.log(clinic.image)
    },[])
  return (
    <div className="appointment-box">
      <div className="appointment-header">
        <span className="icon">🏠</span>
        <h3>In-clinic Appointment</h3>
      </div>

      <div className="appointment-info">
        <p>
          📅 <strong>{date}</strong>
        </p>
        <p>
          ⏰ <strong>{time}</strong>
        </p>
        <a href="#" className="change-link">
          Change Date & Time
        </a>
      </div>

      <div className="doctor-info">
        <img src={doctor?.image} alt={doctor?.name} className="doctor-img" />
        <div className="doctor-details">
          <h4>Dr. {doctor?.name}</h4>
          <p>{doctor?.post}</p>
          <p>{doctor?.specialization}</p>
        </div>
      </div>

      <div className="clinic-info">
        <img src={clinic?.image} alt="Clinic Logo" className="clinic-logo" />
        <div className="clinic-details">
          <h4>{clinic?.name}</h4>
          <p>{clinic?.address}</p>
          <a href="#" className="directions-link">
            Get Directions
          </a>
        </div>
      </div>

      <a href="#" className="back-link">
        Go back to my results
      </a>
    </div>
  );
};

export default AppointmentDetails;
