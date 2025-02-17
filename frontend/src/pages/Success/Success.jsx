import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"
import './Success.css'

const Success = () => {
    const [msg, setMsg] = useState("Login / Signup");
    const [isActive, setIsActive] = useState(false);

    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [user,setUser]=useState(null);
    const [doctor,setDoctor]=useState(null);
    const [clinic,setClinic]=useState(null);
    const [slot,setSlot]=useState(null);


    useEffect(() => {
        async function fetchAppointment() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get/appointment/${appointmentId}`);
                setAppointment(response.data.appointment);
            } catch (error) {
                console.error("Error fetching appointment:", error);
            }
        }

        fetchAppointment();
    }, [appointmentId]); // Dependency on `appointmentId`

    // 2️⃣ Fetch Related Data Once Appointment is Available
    useEffect(() => {
        if (!appointment) return; // Wait until appointment is loaded

        async function fetchClinic() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get/clinic/${appointment.clinicId}`);
                setClinic(response.data.clinic);
            } catch (err) {
                console.log("Error fetching clinic:", err);
            }
        }

        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get/user/${appointment.userId}`);
                setUser(response.data.user);
            } catch (err) {
                console.log("Error fetching user:", err);
            }
        }

        async function fetchDoctor() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get/doctor/id/${appointment.doctorId}`);
                setDoctor(response.data);
            } catch (err) {
                console.log("Error fetching doctor:", err);
            }
        }

        async function fetchSlot() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get/slot/${appointment.slotId}`);
                setSlot(response.data.slot);
            } catch (err) {
                console.log("Error fetching slot:", err);
            }
        }

        fetchClinic();
        fetchUser();
        fetchDoctor();
        fetchSlot();
    }, [appointment]);

    useEffect(()=>{
        if(localStorage.getItem('naam')){
            setMsg(localStorage.getItem('naam'));
        }
    },[])

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

      const handleCancel=async()=>{
        await axios.get(`http://localhost:5000/api/v1/cancel/appointment/${appointmentId}`)
        window.location.href="http://localhost:5000"
      }


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

      <div className="success-container">
            <div className="success-card">
                <h2 className="success-title">🎉 Appointment Confirmed!</h2>

                <div className="appointment-details">
                    <div className="doctor-info">
                        <img src={doctor?.image} alt="Doctor" className="doctor-image" />
                        <p className="doctor-name">{doctor?.name}</p>
                        <p className="doctor-specialization">{doctor?.specialization}</p>
                    </div>

                    <div className="clinic-info">
                        <img src={clinic?.image} alt="Clinic" className="clinic-image" />
                        <p className="clinic-name">{clinic?.name}</p>
                        <p className="clinic-location">{clinic?.location}</p>
                    </div>
                </div>

                <div className="slot-details">
                    <p><strong>Patient:</strong> {user?.name}</p>
                    <p><strong>Date:</strong> {slot?.date}</p>
                    <p><strong>Time:</strong> {slot?.time}</p>
                    <p><strong>Fees:</strong> ₹{clinic?.fee}</p>
                </div>

                <button onClick={handleCancel} className="cancel-btn">Cancel Appointment</button>
            </div>
        </div>
    </>
  )
}

export default Success
