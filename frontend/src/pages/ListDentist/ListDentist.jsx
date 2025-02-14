import React, { useState, useEffect } from 'react';
import './ListDentist.css'
import axios from "axios";
import { MapPin, Phone } from 'lucide-react';
import { ChevronDown } from 'lucide-react';



const ListDentist = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('Dentist');
  const [msg,setMsg]=useState('Login / Signup');

  const searchOptions = [
    { id: 1, name: 'Cold, Cough & Fever', type: 'CONDITION', isClickable: true },
    { id: 2, name: 'Dentist', type: 'SPECIALITY', isClickable: true },
    { id: 3, name: 'Pediatrician', type: 'SPECIALITY' },
    { id: 4, name: 'Dermatologist', type: 'SPECIALITY' },
    { id: 5, name: 'Gynecologist', type: 'SPECIALITY' },
    { id: 6, name: 'Cardiologist', type: 'SPECIALITY' },
    { id: 7, name: 'Back & Neck Pain', type: 'CONDITION' },
    { id: 8, name: 'ENT Specialist', type: 'SPECIALITY' },
    { id: 9, name: 'Orthopedist', type: 'SPECIALITY' },
    { id: 10, name: 'Mental Health', type: 'CONDITION' },
    { id: 11, name: 'Eye Specialist', type: 'SPECIALITY' },
    { id: 12, name: 'Diabetes Management', type: 'CONDITION' },
    { id: 13, name: 'Neurologist', type: 'SPECIALITY' },
    { id: 14, name: 'Physiotherapist', type: 'SPECIALITY' },
    { id: 15, name: 'General Physician', type: 'SPECIALITY' },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/get/doctors/Dentist`);
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.response?.data?.message || 'Failed to fetch doctors');
        setLoading(false);
      }
    };
   
    fetchDoctors();

    if(localStorage.getItem('naam')){
      setMsg(localStorage.getItem('naam'));
    }
  }, []);

  const handleOptionClick = (option) => {
    if (option.isClickable && option.name==='Cold, Cough & Fever') {
      window.location.href = 'http://localhost:5000/list-cough';
    }
    else if(option.isClickable && option.name==='Dentist'){
      window.location.href='http://localhost:5000/list-dentist'
    }
  };

  const logoHandler=()=>{
    window.location.href="http://localhost:5000"
  }

  const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isExperienceOpen, setIsExperienceOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
  
    const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      {value:'both',label:'Both'}
    ];
  
    const experienceOptions = [
      { value: '5', label: '5+ Years' },
      { value: '10', label: '10+ Years' },
      { value: '15', label: '15+ Years' },
      { value: '20', label: '20+ Years' },
      {
          value:'all',
          label:"All"
      }
    ];
  
    const handleGenderSelect =async (value) => {
      setSelectedGender(value);
      setIsGenderOpen(false);

      if(value!="both"){
      try {
        const response=await axios.get(`http://localhost:5000/api/v1/get/doctors/Dentist/${value}`)
        setDoctors(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    else{
      try {
        const response=await axios.get(`http://localhost:5000/api/v1/get/doctors/Dentist`)
        setDoctors(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    };
  
    const handleExperienceSelect = async(value) => {
      setSelectedExperience(value);
      setIsExperienceOpen(false);

      if(value!="all"){
        try {
          const response=await axios.get(`http://localhost:5000/api/v1/get/doctors/Dentist/experience/${value}`)
          setDoctors(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      else{
        try {
          const response=await axios.get(`http://localhost:5000/api/v1/get/doctors/Dentist`)
          setDoctors(response.data)
        } catch (error) {
          console.log(error)
        }
      }
    };

    const msgHandler=()=>{
      if(msg==='Login / Signup'){
        window.location.href="http://localhost:5000/login";
      }
      else{
        localStorage.removeItem('naam');
        localStorage.removeItem('authToken');
        setMsg('Login / Signup');
      }
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
          <a href="http://localhost:5173/search" onClick={() => setIsActive(true)} className={isActive ? 'active' : ''}>Find Doctors</a>
          <a href="#video-consult">Video Consult</a>
          <a href="#surgeries">Surgeries</a>
          <button onClick={msgHandler} className="login-btn">{msg}</button>
        </div>
      </nav>

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
                    className={`dropdown-item ${option.isClickable ? 'clickable' : ''}`}
                    onClick={() => handleOptionClick(option)}
                    style={{ cursor: option.isClickable ? 'pointer' : 'default' }}
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

      <div className="filters-container">
      <div className="filters-bar">
        {/* Gender Filter */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => setIsGenderOpen(!isGenderOpen)}
          >
            <span>Gender</span>
            <ChevronDown size={16} />
          </button>
         
          {isGenderOpen && (
            <div className="dropdown-menu">
              {genderOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-item ${selectedGender === option.value ? 'selected' : ''}`}
                  onClick={() => handleGenderSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => setIsExperienceOpen(!isExperienceOpen)}
          >
            <span>Experience</span>
            <ChevronDown size={16} />
          </button>
         
          {isExperienceOpen && (
            <div className="dropdown-menu">
              {experienceOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-item ${selectedExperience === option.value ? 'selected' : ''}`}
                  onClick={() => handleExperienceSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Doctors Listing Section */}
      <div className="doctors-list-container">
        <div className="doctors-list-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-text">Loading...</div>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-text">Error: {error}</div>
            </div>
          ) : (
            <>
              <div className="doctors-grid">
                {doctors && doctors.map((doctor) => (
                  <div key={doctor.id} className="doctor-card">
                    <div className="doctor-info-section">
                      <div className="doctor-image-container">
                        <img
                          src={doctor.image || '/default-doctor.png'}
                          alt={doctor.name}
                          className="doctor-image"
                        />
                        <div className="practo-badge">
                          <img src="https://www.practostatic.com/marketplace-api/doctor-listing/pcd_logo_bordered.png" alt="Practo Verified" className="badge-icon" />
                        </div>
                      </div>
                     
                      <div className="doctor-details">
                        <h2 className="doctor-name"><a href={`http://localhost:5000/doctor/${doctor.id}`}>{doctor.name}</a></h2>
                        <p className="doctor-speciality">{doctor.specialization}</p>
                        <p className="doctor-experience">{doctor.experience} years experience overall</p>
                       
                        <div className="doctor-location">
                          <MapPin size={16} className="location-icon" />
                          <span>{doctor.location}</span>
                        </div>
                       
                        <div className="doctor-clinic">
                          <p className="clinic-name">{doctor.clinic}</p>
                          <p className="consultation-fee">₹{doctor.consultationFee} Consultation fee at clinic</p>
                        </div>

                        {doctor.rating && (
                          <div className="doctor-rating">
                            <span className="rating-percent">{doctor.rating}%</span>
                            <span className="patient-stories">
                              {doctor.patientStories} Patient Stories
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="doctor-actions">
                      <div className="availability">
                        <span className="available-today">Available Today</span>
                      </div>
                      <button className="book-appointment-btn">Book Clinic Visit</button>
                      <button className="contact-clinic-btn">
                        <Phone size={16} />
                        Contact Clinic
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListDentist;