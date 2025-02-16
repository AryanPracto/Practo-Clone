import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import './PaymentSummary.css'
import AppointmentBox from '../AppointmentBox/AppointmentBox.jsx';
import AppointmentForm from '../AppointmentForm/AppointmentForm.jsx';


const PaymentSummary = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const slotId=searchParams.get("slotId")
    const clinicId = searchParams.get("clinicId");
    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const fee = searchParams.get("fee");
    const token = searchParams.get("token");
  const [msg, setMsg] = useState("Login / Signup");
  const [isActive, setIsActive] = useState(false);
  const [clinic,setClinic]=useState(null);
  const [doctor,setDoctor]=useState(null);
  const [patient, setPatient] = useState({ name: "Aryan Upadhyay", mobile: "+919302359954", email: "aryan.upadhyay@practo.com" });
  const [paymentOption, setPaymentOption] = useState("payLater");
  const [user,setUser]=useState(null)

  const handlePaymentSelection = (option) => {
    setPaymentOption(option);
};

  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) {
        console.error("No token found in URL");
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/v1/get/userId', { token });
        const us = response.data.user;
        setUser(us);
        setMsg(us?.name || "User not found"); // Set user's name or fallback text
      } catch (error) {
        console.error("Error verifying token:", error.response?.data || error.message);
        setMsg("Error fetching user"); // Show an error message in UI
      }
    };
    fetchUserId();

    const fetchClinic=async()=>{
        try {
            const response=await axios.get(`http://localhost:5000/api/v1/get/clinic/${clinicId}`)
            setClinic(response.data.clinic);
        } catch (error) {
            console.log(error);
        }
    }
    fetchClinic();

    const fetchDoctor=async()=>{
        try {
            const response=await axios.get(`http://localhost:5000/api/v1/get/doctor/id/${doctorId}`)
            setDoctor(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchDoctor()

  }, []);

  const logoHandler = () => {
    window.location.href = "http://localhost:5000";
  };

  const msgHandler = () => {
    if (msg === "Login / Signup") {
      window.location.href = "http://localhost:5000/login";
    } else {
      setMsg("Login / Signup");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            onClick={logoHandler}
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practo-logo"
          />
        </div>
        <div className="nav-links">
          <a
            href="http://localhost:5173/search"
            onClick={() => setIsActive(true)}
            className={isActive ? "active" : ""}
          >
            Find Doctors
          </a>
          <a href="#video-consult">Video Consult</a>
          <a href="#surgeries">Surgeries</a>
          <button onClick={msgHandler} className="login-btn">
            {msg}
          </button>
        </div>
      </nav>
    

      <div className="payment-summary-container">
        <AppointmentBox doctor={doctor} clinic={clinic} date={date} time={time}/>  
        <AppointmentForm user={user} clinic={clinic} doctor={doctor} slotId={slotId}/>    
      </div>
    </>
  );
};

export default PaymentSummary;
