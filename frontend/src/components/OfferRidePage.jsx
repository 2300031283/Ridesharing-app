import React, { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ride offered successfully!");
    console.log(formData);
  };

  return (
    <div className="offer-ride-page">
      <h1>Offer a Ride</h1>
      <form className="offer-ride-form" onSubmit={handleSubmit}>
        <label>Name of the person offering ride:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Number of Vacancies:</label>
        <select name="vacancies" value={formData.vacancies} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>From:</label>
        <input type="text" name="from" value={formData.from} onChange={handleChange} required />

        <label>To:</label>
        <input type="text" name="to" value={formData.to} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Price (₹):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Contact Number:</label>
        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

        <button type="submit" className="offer-btn">Submit Ride</button>
      </form>
      
    </div>
  );
};

export default OfferRidePage;
