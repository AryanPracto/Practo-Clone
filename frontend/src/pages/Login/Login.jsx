import React, { useState } from 'react';
import './Login.css';
import axios from "axios"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    useOTP: false
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
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('authToken',response.data.token);
      localStorage.setItem('naam',response.data.name);
      window.location.href="http://localhost:5000/"
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
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
          <button className="login-btn"><a className='lgn' href="http://localhost:5000/signup">Login / Signup</a></button>
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

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Mobile Number / Email ID</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email or mobile number"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me for 30 days</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="useOTP"
                  checked={formData.useOTP}
                  onChange={handleChange}
                />
                <span>Login with OTP instead of password</span>
              </label>
            </div>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
