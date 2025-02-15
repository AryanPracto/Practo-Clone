import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";
import ClinicSelector from "../ClinicSelector/ClinicSelector.jsx"

const DoctorProfile = () => {
  const { id } = useParams();

  // State for toggles/search
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Doctor & Clinics Data
  const [doctor, setDoctor] = useState(null);
  const [clinics, setClinics] = useState([]);

  // Loading/Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI text
  const [currentSearch, setCurrentSearch] = useState("Dentist");
  const [msg, setMsg] = useState("Login / Signup");

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [selectedClinic, setSelectedClinic] = useState(null);

const [slots,setSlots]=useState([]);

  // Popular Searches
  const searchOptions = [
    { id: 1, name: "Cold, Cough & Fever", type: "CONDITION", isClickable: true },
    { id: 2, name: "Dentist", type: "SPECIALITY", isClickable: true },
    { id: 3, name: "Pediatrician", type: "SPECIALITY" },
    { id: 4, name: "Dermatologist", type: "SPECIALITY" },
    { id: 5, name: "Gynecologist", type: "SPECIALITY" },
    { id: 6, name: "Cardiologist", type: "SPECIALITY" },
    { id: 7, name: "Back & Neck Pain", type: "CONDITION" },
    { id: 8, name: "ENT Specialist", type: "SPECIALITY" },
    { id: 9, name: "Orthopedist", type: "SPECIALITY" },
    { id: 10, name: "Mental Health", type: "CONDITION" },
    { id: 11, name: "Eye Specialist", type: "SPECIALITY" },
    { id: 12, name: "Diabetes Management", type: "CONDITION" },
    { id: 13, name: "Neurologist", type: "SPECIALITY" },
    { id: 14, name: "Physiotherapist", type: "SPECIALITY" },
    { id: 15, name: "General Physician", type: "SPECIALITY" },
  ];

  // Fetch doctor & clinics data
  useEffect(() => {
    if (id) {
      // 1. Fetch Doctor by ID
      axios
        .get(`http://localhost:5000/api/v1/get/doctor/id/${id}`)
        .then((res) => {
          setDoctor(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch doctor data.");
          setLoading(false);
        });

      // 2. Fetch Clinics associated with this doctor
      axios
        .get(`http://localhost:5000/api/v1/get/clinics/${id}`)
        .then((res) => {
          setClinics(res.data);
          setSelectedClinic(res.data[0]?.id || null);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if(localStorage.getItem('naam')){
      setMsg(localStorage.getItem('naam'));
    }
  }, [id]);

  useEffect(() => {
    if (id && selectedClinic && selectedDate) {
      axios
        .get(`http://localhost:5000/api/v1/get/slots`, {
          params: {
            doctorId: id,
            clinicId: selectedClinic,
            date: selectedDate
          }
        })
        .then((res) => {
          setSlots(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, selectedClinic]);

  // Handle popular searches
  const handleOptionClick = (option) => {
    if (option.isClickable && option.name === "Cold, Cough & Fever") {
      window.location.href = "http://localhost:5000/list-cough";
    } else if (option.isClickable && option.name === "Dentist") {
      window.location.href = "http://localhost:5000/list-dentist";
    }
  };

  // Logo click -> Home
  const logoHandler = () => {
    window.location.href = "http://localhost:5000";
  };

  // Login / Logout logic
  const msgHandler = () => {
    if (msg === "Login / Signup") {
      window.location.href = "http://localhost:5000/login";
    } else {
      localStorage.removeItem("naam");
      localStorage.removeItem("authToken");
      setMsg("Login / Signup");
    }
  };

  // Helper function to format times (e.g., "09:00:00" -> "09:00 AM")
  const formatTime = (timeStr) => {
    // Basic approach: parse HH:mm:ss and convert
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${adjustedHour}:${minute} ${ampm}`;
  };

  // Early return if still loading
  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  // Early return if doctor not found or error
  if (!doctor || error) {
    return <div className="error-state">{error || "Doctor not found."}</div>;
  }

  // Destructure doctor details
  const { name, specialization, post, experience, description, image } = doctor;

  return (
    <div>
      {/* NavBar */}
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

      {/* Search Section */}
      <div className="search-section">
        <div className="location-search">
          <input type="text" placeholder="Bangalore" />
        </div>
        <div className="doctor-search">
          <input
            type="text"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setIsDropdownVisible(true)}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
          />
          {isDropdownVisible && (
            <div className="search-dropdown">
              <div className="dropdown-header">
                <p>Popular Searches</p>
              </div>
              <div className="dropdown-content">
                {searchOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`dropdown-item ${
                      option.isClickable ? "clickable" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                    style={{ cursor: option.isClickable ? "pointer" : "default" }}
                  >
                    <div className="item-info">
                      <p className="item-name">{option.name}</p>
                      <p className="item-type">{option.type}</p>
                    </div>
                    <svg
                      className="arrow-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Doctor Profile Container */}
      <div className="doctor-profile-container">
        <div className="profile-main">
          {/* Left Column */}
          <div className="profile-left">
            {/* Doctor Basic Info */}
            <div className="doctor-basic-info">
              <div className="doctor-image">
                <img src={image || "/default-doctor.png"} alt={name} />
              </div>
              <div className="doctor-info">
                <h1>{name}</h1>
                <div className="qualifications">{specialization}</div>
                <div className="specialities">
                  {post &&
                    post.split(",").map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty.trim()}
                      </span>
                    ))}
                </div>
                <div className="experience">
                  {experience} Years Experience Overall
                </div>
                <div className="registration">
                  <span className="verified-badge">
                    ✓ Medical Registration Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Description */}
            <div className="doctor-description">
              <p>{description}</p>
            </div>

            {/* Clinic Information */}
            <div className="clinic-info">
              <h2>Clinic Details</h2>
              {/* Map over all clinics fetched for this doctor */}
              {clinics.map((clinic) => (
                <div key={clinic.id} className="clinic-card">
                  <h3>
                    {clinic.name}{" "}
                    <span className="clinic-rating">★ {clinic.rating}</span>
                  </h3>
                  <div className="clinic-timings">
                    <div className="timing-label">Timings:</div>
                    <div className="timing-value">
                      {clinic.workingDays} <br />
                      {formatTime(clinic.openingTime)} -{" "}
                      {formatTime(clinic.closingTime)}
                    </div>
                  </div>
                  <div className="clinic-fee">
                    <span className="fee-label">Consultation Fee:</span>
                    <span className="fee-value">₹{clinic.fee}</span>
                  </div>
                  <div className="clinic-address">
                    <p>{clinic.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Appointment Section) */}
          <ClinicSelector 
  clinic={clinics[0]}  // Ensure prop name matches
  slots={slots}
/>
        </div>
      </div> 
    </div>
  );
};

export default DoctorProfile;
