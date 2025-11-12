import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "./HomePage1.css";

const HomePage1 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("You have logged out!");
    // You can navigate("/") or clear auth state here
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">RideShare</div>
        <nav className="nav">
          <Link to="/offer-ride">Offer a ride</Link>

          {/* Profile Dropdown */}
          <div className="profile-menu" ref={dropdownRef}>
            <button className="profile-icon" onClick={toggleDropdown}>
              <User size={28} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/your-rides">Your Rides</Link>
                <Link to="/inbox">Inbox</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/transfers">Transfers</Link>
                <Link to="/payments">Payments & Refunds</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
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

export default HomePage1;
