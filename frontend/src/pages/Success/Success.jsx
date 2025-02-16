import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"

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
                setSlot(response.data);
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

    <h2>Appointment Confirmed 🎉</h2>
        <p>appointment id : {appointment?.id}</p>
        <p>Doctor name is : {doctor?.name}</p>
        <p>Clinic name is : {clinic?.name}</p>
        <p>User name is : {user?.name}</p>

    <button onClick={() => console.log("Cancel Appointment Logic")}>Cancel Appointment</button>
    </>
  )
}

export default Success
