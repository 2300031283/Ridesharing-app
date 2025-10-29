import React from "react";
import "./App.css";

function App() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">RideShare</div>
        <nav className="nav">
          <a href="#">Offer a ride</a>
          <a href="#">Find a ride</a>
          <a href="#">Login</a>
          <button className="signup-btn">Sign up</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Going somewhere?</h1>
          <p>Find your perfect bike/car today.</p>

          {/* Search Box */}
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
}

export default App;
