import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react';
import './ClinicSelector.css';

const ClinicSelector = ({ clinic, slots }) => {
  const [selectedDate, setSelectedDate] = useState('Today');
  const dates = ['Today', 'Tomorrow', 'Mon, 17 Feb'];

  // Function to handle time slot click
  const handleSlotClick = (slot) => {
    if (!localStorage.getItem("authToken")) {
      alert("Please login before booking the slot!");
      return;
    }
  
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    console.log(clinic?.id);
    console.log(slot?.doctorId);
    console.log(clinic?.id);
    console.log(selectedDate);
  
    const queryParams = new URLSearchParams({
      slotId:slot?.id || '',
      clinic: clinic?.name || "n/a",
      clinicId: clinic?.id || "n/a", // Clinic ID
      doctorId: slot?.doctorId || "n/a", // Doctor ID
      date: selectedDate, // Selected date
      time: slot?.time || "n/a", // Slot time
      fee: clinic?.fee || "N/A",
      token: token || "", // Append token as a query parameter
    }).toString();
  
    window.location.href = `http://localhost:5173/payment-summary?${queryParams}`;
  };

  return (
    <div className="clinic-selector">
      <h2 className="clinic-title">Pick a time slot</h2>

      {/* Clinic Appointment Header */}
      <div className="clinic-header">
        <div className="clinic-header-info">
          <HomeIcon className="clinic-home-icon" />
          <span className="clinic-header-text">Clinic Appointment</span>
        </div>
      </div>

      {/* Clinic Info */}
      <div className="clinic-info">
        <h3>{clinic?.name || 'n/a'}</h3>
        <div className="rating">
          <span>{clinic?.rating || "N/A"}</span>
          <span>★</span>
        </div>
        <span className="clinic-fee">₹ {clinic?.fee || "N/A"}</span>
      </div>

      {/* Date Selection */}
      <div className="date-selector">
        <button className="date-arrow">
          <ChevronLeft className="icon" />
        </button>

        <div className="date-options">
          {dates.map((date) => (
            <div
              key={date}
              className={`date-option ${selectedDate === date ? 'selected-date' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="date-label">{date}</div>
              <div className="date-slots">
                {date === 'Today'}
              </div>
            </div>
          ))}
        </div>

        <button className="date-arrow">
          <ChevronRight className="icon" />
        </button>
      </div>

      {/* Time Slots */}
      <div className="time-slot-container">
        <h4>
          <span>{slots?.length} Slots</span>
        </h4>
        <div className="time-slots">
          {slots.map((slot) => (
            <button key={slot.id} className="time-slot-button" onClick={() => handleSlotClick(slot)}>
              {slot?.time || "na"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicSelector;
