import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Implement search functionality here
  };

  return (
    <div className="home">
      <div className="navbar">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practoLogo"
          />
        </div>
        <div className="navLinks">
          <a className="active" href="http://localhost:5173/search">Find Doctors</a>
          <a href="/video-consult">Video Consult</a>
          <a href="/surgeries">Surgeries</a>
          <button className="loginBtn">Login / Signup</button>
        </div>
      </div>

      <div className="heroSection">
        <div className="heroContent">
          <h1>Your home for health</h1>
          <h2>Find and Book</h2>
          <div className="searchContainer">
            <input
              type="text"
              placeholder="📍 Bangalore"
              value={searchTerm}
              onChange={handleSearch}
              className="searchInput"
            />
            <input type="text" name="" id="" placeholder="search doctors,clinics etc." className="searchInput"/>
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