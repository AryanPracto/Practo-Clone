import React, { useEffect, useState } from "react";
import "./AppointmentForm.css";
import axios from "axios";

const AppointmentForm = ({ user,clinic,doctor,slotId}) => {
  const [patientType, setPatientType] = useState("self");
  const [fullName, setFullName] = useState(user?.name || "");  
  const [mobile, setMobile] = useState("+911234567890");  
  const [email, setEmail] = useState(user?.email || "");  
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  useEffect(() => {
    if (patientType === "self") {
      setFullName(user?.name || "");
      setEmail(user?.email || "");
    } else {
      setFullName("");
      setEmail("");
    }
  }, [patientType, user]);

  const onClickHandler=async()=>{
    console.log(user?.id,Number(slotId),doctor?.id,clinic?.id,clinic?.fee)
    const data={
        userId:user?.id,
        slotId:Number(slotId),
        doctorId:doctor?.id,
        clinicId:clinic?.id,
        fee:clinic?.fee
    }

    const response=await axios.post('http://localhost:5000/api/v1/checkout/booking',{data});
    window.location.href=response.data.url;
  }

  return (
    <div className="appointment-form">
      <h2>Patient Details</h2>
      <p className="appointment-subheading">This in-clinic appointment is for:</p>

      <div className="radio-group">
        <label className={`radio-option ${patientType === "self" ? "selected" : ""}`}>
          <input
            type="radio"
            name="patientType"
            checked={patientType === "self"}
            onChange={() => setPatientType("self")}
          />
          {user?.name}
        </label>
        <label className={`radio-option ${patientType === "other" ? "selected" : ""}`}>
          <input
            type="radio"
            name="patientType"
            checked={patientType === "other"}
            onChange={() => setPatientType("other")}
          />
          Someone Else
        </label>
      </div>

      <p className="appointment-subheading">Please provide the following information about {fullName || "the patient"}:</p>

      <label className="input-label">Full Name<span className="required">*</span></label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input-field"
      />

      <label className="input-label">Mobile<span className="required">*</span></label>
      <input
        type="text"
        value={mobile}
        readOnly
        className="input-field locked"
      />

      <label className="input-label">Your Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />

      <div className="checkbox-group">
        <input
          type="checkbox"
          checked={whatsappUpdates}
          onChange={() => setWhatsappUpdates(!whatsappUpdates)}
        />
        <span> Get updates on WhatsApp number {mobile}</span>
      </div>

      <button onClick={onClickHandler} className="confirm-btn">Confirm Clinic Visit</button>

      <p className="updates-info">1. Updates will be sent to {mobile}</p>
      <p className="terms">
        By booking this appointment, you agree to Practo’s <a href="#">Terms and Conditions</a>.
      </p>
    </div>
  );
};

export default AppointmentForm;
