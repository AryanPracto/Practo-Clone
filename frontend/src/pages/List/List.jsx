import React from 'react'
import { useState } from 'react';
import './List.css'

const List = () => {
   const [isActive, setIsActive] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
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
      </>
  )
}

export default List
