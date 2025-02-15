import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

const PaymentSummary = () => {
    const searchParams = new URLSearchParams(window.location.search);
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

  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) {
        console.error("No token found in URL");
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/v1/get/userId', { token });
        const user = response.data.user;
        setMsg(user?.name || "User not found"); // Set user's name or fallback text
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
  }, []); // Re-run effect when `token` changes

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
      
      <div>
        <h2>Payment Summary</h2>
        <p>Clinic: {clinic?.name}</p>
        <p>Time: {time}</p>
        <p>Fee: {fee}</p>
        <p>Date : {date}</p>
        <p>Doctor : {doctor?.name}</p>
      </div>
    </>
  );
};

export default PaymentSummary;
