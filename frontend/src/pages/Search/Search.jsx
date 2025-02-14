import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [msg,setMsg]=useState('')
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  useEffect(()=>{
    if(localStorage.getItem('naam')){
      setMsg(localStorage.getItem('naam'));
    }
  },[])


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Implement search functionality here
  };

  const handleOptionClick = (option) => {
    if (option.isClickable) {
      if (option.name === 'Cold, Cough & Fever') {
        window.location.replace('http://localhost:5000/list-cough');
      } else if (option.name === 'Dentist') {
        window.location.replace('http://localhost:5000/list-dentist');
      }
    }
  };

  const logoHandler=()=>{
    window.location.href="http://localhost:5000"
  }

  return (
    <div className="home">
      <div className="navbar">
        <div className="logo">
          <img
          onClick={logoHandler}
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practoLogo"
          />
        </div>
        <div className="navLinks">
          <a className="active" href="http://localhost:5173/search">Find Doctors</a>
          <a href="/video-consult">Video Consult</a>
          <a href="/surgeries">Surgeries</a>
          <button className={msg===''?'loginBtn':" "}>{msg===''?'Signup / Login':msg}</button>
        </div>
      </div>

      <div className="heroSection">
        <div className="heroContent">
          <h1>Your home for health</h1>
          <h2>Find and Book</h2>
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
        </div>
      </div>

      <div className="servicesSection">
        <ul className="servicesList">
            <li>consult a doctor</li>
          <li>Order Medicine</li>
          <li>View medical records</li>
          <li>Book test</li>
          <li>Read articles</li>
          <li>For healthcare providers</li>
        </ul>
      </div>
    </div>
  );
};

export default Search;