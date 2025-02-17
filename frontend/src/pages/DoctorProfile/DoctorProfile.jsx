import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";
import ClinicSelector from "../ClinicSelector/ClinicSelector.jsx"
import dayjs from "dayjs"; // Install it if not already: npm install dayjs
import Cookies from 'js-cookie';

const DoctorProfile = () => {
  const { id } = useParams();

  // State for toggles/search
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState("info");
  const [stories, setStories] = useState([]);

  // Doctor & Clinics Data
  const [doctor, setDoctor] = useState(null);
  const [clinics, setClinics] = useState([]);

  // Loading/Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI text
  const [currentSearch, setCurrentSearch] = useState("Dentist");
  const [msg, setMsg] = useState("Login / Signup");
  const today = dayjs().format("YYYY-MM-DD"); // Format date properly
const [selectedDate, setSelectedDate] = useState(today);

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

        axios.get(`http://localhost:5000/api/v1/get/story/${id}`)
        .then((res) => {
          setStories(res.data.stories);
        });
    }
  }, [id]);

  useEffect(()=>{
      const name = Cookies.get('naam');
          console.log("Cookie value:", name); // Debugging step
          if (name) {
            setMsg(name);
          } else {
            setMsg("Login / Signup"); // Fallback if the cookie is empty or missing
          }
    },[])

  useEffect(() => {
    if (id && selectedClinic && selectedDate) {
      console.log(id,selectedClinic,selectedDate);
      axios
  .get(`http://localhost:5000/api/v1/get/slots`, {
    params: {
      doctorId: id,
      clinicId: selectedClinic,
      date: selectedDate
    }
  })
  .then((response) => {
    console.log("API Response:", response.data); // Log the response
    setSlots(response.data); // Assuming response.data contains slots
  })
  .catch((error) => {
    console.error("Error fetching slots:", error);
  });
    }
    else{
      console.log(selectedDate)
    }
  }, [id, selectedClinic, selectedDate]);

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
  const msgHandler = async() => {
    if (msg === "Login / Signup") {
      window.location.href = "http://localhost:5000/login";
    } else {
      localStorage.removeItem("naam");
      localStorage.removeItem("authToken");
      await axios.post('http://localhost:5000/api/v1/auth/logout');
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
                  {post?.split(",").map((specialty, index) => (
                    <span key={index} className="specialty-tag">
                      {specialty.trim()}
                    </span>
                  ))}
                </div>
                <div className="experience">{experience} Years Experience Overall</div>
              </div>
            </div>

            {/* Doctor Description Section */}
            <div className="doctor-description">
              <h2>About Doctor</h2>
              <p>{description}</p>
            </div>

            {/* Dropdown for Info & Stories */}
            <div className="section-dropdown">
              <button 
                className={selectedSection === "info" ? "active" : ""} 
                onClick={() => setSelectedSection("info")}
              >
                Info
              </button>
              <button 
                className={selectedSection === "stories" ? "active" : ""} 
                onClick={() => setSelectedSection("stories")}
              >
                Stories
              </button>
            </div>

            {/* Clinic Info Section */}
            {selectedSection === "info" && (
              <div className="clinic-info">
                <h2>Clinic Details</h2>
                {clinics.map((clinic) => (
                  <div key={clinic.id} className="clinic-card">
                    <h3>{clinic.name}</h3>
              <p><strong>Location:</strong> {clinic.location}</p>
              <p><strong>Working Days:</strong> {clinic.workingDays}</p>
              <p><strong>Timings:</strong> {clinic.openingTime}-{clinic.closingTime}</p>
              <p><strong>Consultation Fee:</strong> ₹{clinic.fee}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Patient Stories Section */}
            {selectedSection === "stories" && (
              <div className="patient-stories">
                <h2>Patient Stories</h2>
                {stories.length > 0 ? (
                  stories.map((story) => (
                    <div key={story.id} className="story-card">
                      <h3>{story.userName}</h3>
                      <p className="story-title">{story.title}</p>
                      <p className="story-content">{story.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No stories available.</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column (Appointment Section) */}
          <ClinicSelector id={id} clinic={clinics[0]} slots={slots} />
        </div>
      </div> 
    </div>
  );
};

export default DoctorProfile;
