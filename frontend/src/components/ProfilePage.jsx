import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  const goToPersonalDetails = () => {
    navigate("/personal-details");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-name">Your Name</h2>

        {/* PERSONAL DETAILS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("personalDetails")}
          >
            <span>Personal Details</span>
            <span>{openSection === "personalDetails" ? "−" : "+"}</span>
          </div>
          {openSection === "personalDetails" && (
            <div className="profile-content">
              <button onClick={goToPersonalDetails}>Edit Personal Details</button>
            </div>
          )}
        </div>

        {/* RATINGS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("ratings")}
          >
            <span>Ratings</span>
            <span>{openSection === "ratings" ? "−" : "+"}</span>
          </div>
          {openSection === "ratings" && (
            <div className="profile-content">
              <p>Your average rating: ⭐ 4.8</p>
              <p>You can see feedback from passengers here.</p>
            </div>
          )}
        </div>

        {/* SAVED PASSENGERS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("savedPassengers")}
          >
            <span>Saved Passengers</span>
            <span>{openSection === "savedPassengers" ? "−" : "+"}</span>
          </div>
          {openSection === "savedPassengers" && (
            <div className="profile-content">
              <p>No saved passengers yet.</p>
            </div>
          )}
        </div>

        {/* COMMUNICATION PREFERENCES */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("communication")}
          >
            <span>Communication Preferences</span>
            <span>{openSection === "communication" ? "−" : "+"}</span>
          </div>
          {openSection === "communication" && (
            <div className="profile-content">
              <label>
                Notifications:
                <select>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Both</option>
                </select>
              </label>
              <button>Save Preferences</button>
            </div>
          )}
        </div>

        {/* PASSWORD */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("password")}
          >
            <span>Password</span>
            <span>{openSection === "password" ? "−" : "+"}</span>
          </div>
          {openSection === "password" && (
            <div className="profile-content">
              <input type="password" placeholder="Enter new password" />
              <button>Update Password</button>
            </div>
          )}
        </div>

        {/* POSTAL ADDRESS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("postal")}
          >
            <span>Postal Address</span>
            <span>{openSection === "postal" ? "−" : "+"}</span>
          </div>
          {openSection === "postal" && (
            <div className="profile-content">
              <input type="text" placeholder="Enter postal address" />
              <button>Save Address</button>
            </div>
          )}
        </div>

        {/* PAYOUT METHODS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("payoutMethods")}
          >
            <span>Payout Methods</span>
            <span>{openSection === "payoutMethods" ? "−" : "+"}</span>
          </div>
          {openSection === "payoutMethods" && (
            <div className="profile-content">
              <p>Add or manage payout methods here.</p>
              <button>Add Method</button>
            </div>
          )}
        </div>

        {/* PAYOUTS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("payouts")}
          >
            <span>Payouts</span>
            <span>{openSection === "payouts" ? "−" : "+"}</span>
          </div>
          {openSection === "payouts" && (
            <div className="profile-content">
              <p>No payouts available yet.</p>
            </div>
          )}
        </div>

        {/* PAYMENT METHODS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("paymentMethods")}
          >
            <span>Payment Methods</span>
            <span>{openSection === "paymentMethods" ? "−" : "+"}</span>
          </div>
          {openSection === "paymentMethods" && (
            <div className="profile-content">
              <p>Add debit/credit card, UPI, etc.</p>
              <button>Add Payment Method</button>
            </div>
          )}
        </div>

        {/* PAYMENTS & REFUNDS */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("paymentsRefunds")}
          >
            <span>Payments & Refunds</span>
            <span>{openSection === "paymentsRefunds" ? "−" : "+"}</span>
          </div>
          {openSection === "paymentsRefunds" && (
            <div className="profile-content">
              <p>No recent transactions.</p>
            </div>
          )}
        </div>

        {/* DATA PROTECTION */}
        <div className="profile-item">
          <div
            className="profile-header"
            onClick={() => toggleSection("dataProtection")}
          >
            <span>Data Protection</span>
            <span>{openSection === "dataProtection" ? "−" : "+"}</span>
          </div>
          {openSection === "dataProtection" && (
            <div className="profile-content">
              <p>Your data is securely stored and encrypted.</p>
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <div className="profile-item logout-option" onClick={handleLogout}>
          <div className="profile-header">
            <span>Log out</span>
          </div>
        </div>

        {/* CLOSE ACCOUNT */}
        <div className="profile-item close-account">
          <div className="profile-header">
            <span>Close my account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
