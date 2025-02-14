import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    receiveOffers: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup', {
        name:formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('authToken',response.data.token);
      localStorage.setItem('naam',response.data.name);
      window.location.href="http://localhost:5000/"
    } catch (error) {
      console.error('Signin error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  const logoHandler=()=>{
    window.location.href="http://localhost:5000"
  }

  return (
    <div className="auth-container">
      <nav className="nav-bar">
      <div className="logo">
          <img
          onClick={logoHandler}
            src="https://upload.wikimedia.org/wikipedia/en/6/64/Practo_new_logo.png?20180609150803"
            alt="Practo Logo"
            className="practo-logo"
          />
        </div>
        <div className="nav-links">
          <a href="#">Find Doctors</a>
          <a href="#">Video Consult</a>
          <a href="#">Medicines</a>
          <a href="#">Lab Tests</a>
          <a href="#">Surgeries</a>
        </div>
        <div className="nav-right">
          <span>For Corporates</span>
          <span>For Providers</span>
          <span>Security & help</span>
          <button className="login-btn"><a className='lgn' href="http://localhost:5000/login">Login / Signup</a></button>
        </div>
      </nav>

      <div className="auth-content">
        <div className="auth-image">
          <img src="https://accounts.practo.com/static/images/illustration.png" alt="Healthcare illustration" />
        </div>
       
        <div className="auth-form-container">
          <div className="auth-tabs">
            <div className="tab"><a href="http://localhost:5000/login" className='lgnt'>Login</a></div>
            <div className="tab"><a href="http://localhost:5000/signup" className='sgnt'>Register</a></div>
          </div>

          <div className="signup-header">
            <h2>Join Practo</h2>
            <p>Are you a doctor? <a href="#" className="register-link">Register Here</a></p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="mobile-input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Create Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="receiveOffers"
                  checked={formData.receiveOffers}
                  onChange={handleChange}
                />
                <span>Receive relevant offers and promotional communication from Practo</span>
              </label>
            </div>

            <div className="terms-text">
              By signing up, I agree to <a href="#">terms</a>
            </div>

            <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;