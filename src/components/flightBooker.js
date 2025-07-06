import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';

function FlightBooker() {
  const [flightType, setFlightType] = useState('one-way');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const validateForm = useCallback(() => {
    if (!departureDate || departureDate < today) {
      setIsFormValid(false);
      return;
    }

    if (flightType === 'return') {
      if (!returnDate || returnDate < departureDate) {
        setIsFormValid(false);
        return;
      }
    }

    setIsFormValid(true);
  }, [flightType, departureDate, returnDate, today]);

  useEffect(() => {
    validateForm();
  }, [flightType, departureDate, returnDate, validateForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (flightType === 'one-way') {
      alert(`You have booked a one-way flight on ${departureDate}.`);
    } else {
      alert(`You have booked a return flight from ${departureDate} to ${returnDate}.`);
    }
  }

  return (
    <div className="flight-booker-container">
      <h2 className="flight-booker-title">Flight Booker</h2>
      <form className="flight-booker-form" onSubmit={handleSubmit}>
        <div>
          <label>Flight Type:</label>
          <select
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
          >
            <option value="one-way">One-Way Flight</option>
            <option value="return">Return Flight</option>
          </select>
        </div>
        <div>
          <label>Departure Date:</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            min={today}
          />
        </div>
        {flightType === 'return' && (
          <div>
            <label>Return Date:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departureDate || today}
            />
          </div>
        )}
        <button type="submit" disabled={!isFormValid}>
          Book Flight
        </button>
      </form>
    </div>
  );
}

export default FlightBooker;
