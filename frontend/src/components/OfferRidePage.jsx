import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";
import "./OfferRidePage.css";

const OfferRidePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    vacancies: "",
    from: "",
    to: "",
    time: "",
    date: "",
    price: "",
    contact: "",
  });

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch all rides on component mount
  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/rides`);
      const data = await res.json();
      
      if (data.status === "ok") {
        setRides(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const rideData = {
        ...formData,
        vacancies: parseInt(formData.vacancies),
        price: parseFloat(formData.price),
      };

      const res = await fetch(`${API_BASE_URL}/api/rides/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.status === "error") {
        setError(data.message || "Failed to offer ride. Try again.");
        return;
      }

      // Success
      setSuccess(true);
      setFormData({
        name: "",
        gender: "",
        vacancies: "",
        from: "",
        to: "",
        time: "",
        date: "",
        price: "",
        contact: "",
      });

      // Refresh rides list
      fetchRides();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Offer ride error:", err);
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="offer-ride-page">
      <h1>🚗 Offer a Ride</h1>
      
      <div className="offer-ride-container">
        <div className="form-section">
          <h2>Offer Ride Form</h2>
          <form className="offer-ride-form" onSubmit={handleSubmit}>
            <label>Name of the person offering ride:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>Gender:</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              disabled={loading}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Number of Vacancies:</label>
            <select 
              name="vacancies" 
              value={formData.vacancies} 
              onChange={handleChange} 
              disabled={loading}
              required
            >
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label>From:</label>
            <input 
              type="text" 
              name="from" 
              value={formData.from} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>To:</label>
            <input 
              type="text" 
              name="to" 
              value={formData.to} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>Time:</label>
            <input 
              type="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>Price (₹):</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <label>Contact Number:</label>
            <input 
              type="tel" 
              name="contact" 
              value={formData.contact} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />

            <button 
              type="submit" 
              className="offer-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ride"}
            </button>
          </form>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              ✅ Ride Offered Successfully! Your ride has been posted.
            </div>
          )}
        </div>

        <div className="rides-section">
          <h2>Available Rides ({rides.length})</h2>
          {rides.length === 0 ? (
            <p className="no-rides">No rides available yet.</p>
          ) : (
            <div className="rides-table-container">
              <table className="rides-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Price (₹)</th>
                    <th>Vacancies</th>
                    <th>Gender</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.map((ride) => (
                    <tr key={ride.id}>
                      <td>{ride.name}</td>
                      <td>{ride.from}</td>
                      <td>{ride.to}</td>
                      <td>{ride.date}</td>
                      <td>{ride.time}</td>
                      <td>₹{ride.price}</td>
                      <td>{ride.vacancies}</td>
                      <td>{ride.gender}</td>
                      <td>{ride.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferRidePage;
