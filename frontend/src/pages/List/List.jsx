import React, { useState, useEffect } from 'react';
import './List.css';

const List = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('Dentist');

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
      try {
        // Get search param from URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search') || 'Dentist';
        setCurrentSearch(searchQuery);

        const response = await fetch(`http://localhost:5000/api/v1/get/doctors/${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleOptionClick = (option) => {
    if (option.isClickable) {
      const searchQuery = encodeURIComponent(option.name);
      window.location.href = `http://localhost:5000/list?search=${searchQuery}`;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practo-logo"
          />
        </div>
        <div className="nav-links">
          <a href="http://localhost:5173/search" onClick={() => setIsActive(true)} className={isActive ? 'active' : ''}>Find Doctors</a>
          <a href="#video-consult">Video Consult</a>
          <a href="#surgeries">Surgeries</a>
          <button className="login-btn">Login / Signup</button>
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

      {/* Doctors Listing Section */}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-10">
              <div className="text-xl">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-xl text-red-600">Error: {error}</div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8 text-gray-800">
                {currentSearch} in Your Area
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                              <p className="text-gray-600 text-sm mt-1">{doctor.specialization}</p>
                            </div>
                            <span className="text-blue-600 text-sm">{doctor.gender}</span>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-gray-600">{doctor.post}</p>
                            <p className="text-gray-600 mt-1">{doctor.experience} years experience</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-700 text-sm line-clamp-3">
                          {doctor.description}
                        </p>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                          Book Appointment
                        </button>
                      </div>
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

export default List;