import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    postalAddress: "",
    paymentMethod: "",
    payoutMethod: "",
    averageRating: 0,
  });
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Load profile data on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setProfileData(prev => ({
          ...prev,
          email: user.email || "",
          fullName: user.email || "User",
        }));
        // Fetch full profile from backend
        fetchProfile(user.email);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const fetchProfile = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${email}`);
      const data = await res.json();
      
      if (data.status === "ok" && data.profile) {
        setProfileData(data.profile);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setEditValue(value || "");
  };

  const handleSaveField = async (field) => {
    if (!editValue.trim()) {
      setError("Field cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updatedData = {
        email: profileData.email,
        [field]: editValue,
      };

      const res = await fetch(`${API_BASE_URL}/api/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.status === "error") {
        setError(data.message || "Failed to update");
        return;
      }

      // Update local state
      setProfileData(prev => ({
        ...prev,
        [field]: editValue,
      }));

      setSuccess(true);
      setEditingField(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error saving field:", err);
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  const profileFields = [
    { key: "fullName", label: "Full Name", value: profileData.fullName },
    { key: "email", label: "Email", value: profileData.email, editable: false },
    { key: "phone", label: "Phone", value: profileData.phone },
    { key: "gender", label: "Gender", value: profileData.gender },
    { key: "dateOfBirth", label: "Date of Birth", value: profileData.dateOfBirth },
    { key: "postalAddress", label: "Postal Address", value: profileData.postalAddress },
    { key: "paymentMethod", label: "Payment Method", value: profileData.paymentMethod },
    { key: "payoutMethod", label: "Payout Method", value: profileData.payoutMethod },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToPersonalDetails = () => {
    navigate("/personal-details");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">👤 My Profile</h1>
        
        {/* Success Message */}
        {success && (
          <div className="success-message">
            ✅ Profile Updated Successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Profile Fields Table */}
        <div className="profile-table-section">
          <h2>Profile Information</h2>
          <div className="table-container">
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Current Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {profileFields.map((field) => (
                  <tr key={field.key}>
                    <td className="field-label">{field.label}</td>
                    <td className="field-value">
                      {editingField === field.key ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="edit-input"
                          disabled={loading}
                        />
                      ) : (
                        field.value || "Not set"
                      )}
                    </td>
                    <td className="action-cell">
                      {editingField === field.key ? (
                        <div className="action-buttons">
                          <button
                            className="save-btn"
                            onClick={() => handleSaveField(field.key)}
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => setEditingField(null)}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEditClick(field.key, field.value)}
                          disabled={field.editable === false || loading}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="accordion-section">
          <h2>Additional Options</h2>
          
          {/* RATINGS */}
          <div className="profile-item">
            <div
              className="profile-header"
              onClick={() => toggleSection("ratings")}
            >
              <span>⭐ Ratings</span>
              <span>{openSection === "ratings" ? "−" : "+"}</span>
            </div>
            {openSection === "ratings" && (
              <div className="profile-content">
                <p>Your average rating: ⭐ {profileData.averageRating || "4.8"}</p>
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
              <span>👥 Saved Passengers</span>
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
              <span>🔔 Communication Preferences</span>
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

          {/* PAYMENT METHODS */}
          <div className="profile-item">
            <div
              className="profile-header"
              onClick={() => toggleSection("paymentMethods")}
            >
              <span>💳 Payment Methods</span>
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
              <span>💰 Payments & Refunds</span>
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
              <span>🔒 Data Protection</span>
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
              <span>🚪 Log out</span>
            </div>
          </div>

          {/* CLOSE ACCOUNT */}
          <div className="profile-item close-account">
            <div className="profile-header">
              <span>❌ Close my account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
