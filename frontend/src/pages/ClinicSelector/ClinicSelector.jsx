import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react';
import './ClinicSelector.css';
import dayjs from "dayjs"
import axios from "axios"
import Cookies from 'js-cookie';

const ClinicSelector = ({ id, clinic, slots }) => {
  const [selectedDate, setSelectedDate] = useState('2025-02-17');
  const [slo,setSlo]=useState(slots);
  const dates = [
    { label: 'Today', value: dayjs().format("YYYY-MM-DD") },
    { label: 'Tomorrow', value: dayjs().add(1, 'day').format("YYYY-MM-DD") },
    { label: 'Wed, 19 Feb', value: dayjs().add(2, 'day').format("YYYY-MM-DD") }
  ];

  useEffect(() => {
    if (id && selectedDate && clinic?.id) {
      console.log("Fetching slots for:", selectedDate);
      
      setSlo([]); // Clear previous slots before fetching new ones
  
      axios
        .get(`http://localhost:5000/api/v1/get/slots`, {
          params: {
            doctorId: id,
            clinicId: clinic?.id,
            date: selectedDate, // Fetch slots for the selected date
          }
        })
        .then((response) => {
          console.log("API Response for slots:", response.data);
          setSlo(response.data || []); // Ensure slots update properly
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
          setSlo([]); // Prevent stale data on error
        });
    }
  }, [id, selectedDate, clinic?.id]); 

  // Function to handle time slot click
  const handleSlotClick = (slot) => {
    if (!localStorage.getItem("authToken")) {
      alert("Please login before booking the slot!");
      return;
    }
  
    const token = Cookies.get('authToken'); // Get token from localStorage
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
  {dates.map((dateObj) => (
    <div
      key={dateObj.value}
      className={`date-option ${selectedDate === dateObj.value ? 'selected-date' : ''}`}
      onClick={() => {
        setSelectedDate(dateObj.value); // Store actual date in YYYY-MM-DD format
      }}
    >
      <div className="date-label">{dateObj.label}</div> 
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
          <span>{slo?.length} Slots</span>
        </h4>
        <div className="time-slots">
          {slo.map((slot) => (
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
