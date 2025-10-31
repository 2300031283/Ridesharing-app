import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">RideShare</div>
        <nav className="nav">
          <Link to="/offer-ride">Offer a ride</Link>
          <a href="#">Find a ride</a>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="signup-btn">Sign up</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Going somewhere?</h1>
          <p>Find your perfect carpool today.</p>

          <div className="search-box">
            <input type="text" placeholder="From" className="search-input" />
            <input type="text" placeholder="To" className="search-input" />
            <input type="date" className="search-input date" />
            <button className="search-btn">Search Ride</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
