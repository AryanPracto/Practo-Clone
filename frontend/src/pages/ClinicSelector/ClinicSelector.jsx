import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react';

const ClinicSelector = ({ selectedClinic, slots }) => {
  const [selectedDate, setSelectedDate] = useState('Today');
  const dates = ['Today', 'Tomorrow', 'Mon, 17 Feb'];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pick a time slot</h2>
      
      {/* Clinic Appointment Header */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HomeIcon className="w-6 h-6 text-blue-500" />
          <span className="text-gray-800 text-lg font-medium">Clinic Appointment</span>
        </div>
        <span className="text-lg font-medium">₹ 300 fee</span>
      </div>

      {/* Clinic Info */}
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Chisel Dental</h3>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center">
            <span className="text-lg">5</span>
            <span className="text-gray-500 ml-1">★</span>
          </div>
          <span className="text-gray-800">₹300</span>
          <span className="text-purple-600">Max 15 mins wait</span>
        </div>
        <p className="text-gray-600">Koramangala</p>
      </div>

      {/* Date Selection */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex gap-8">
          {dates.map((date) => (
            <div 
              key={date}
              className={`text-center cursor-pointer ${
                selectedDate === date ? 'border-b-2 border-blue-500' : ''
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="font-medium mb-1">{date}</div>
              <div className={`text-sm ${
                selectedDate === date ? 'text-blue-500' : 'text-green-500'
              }`}>
                {date === 'Today' ? '3' : '14'} Slots Available
              </div>
            </div>
          ))}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">
          Evening <span className="text-gray-500 font-normal">(3 slots)</span>
        </h4>
        <div className="flex gap-4">
          {['04:50 PM', '05:10 PM', '05:20 PM'].map((time) => (
            <button
              key={time}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicSelector;