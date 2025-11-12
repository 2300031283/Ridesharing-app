import React, { useState } from "react";
import "./PersonalDetailsPage.css";

const PersonalDetailsPage = () => {
  // State to track expanded sections
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="personal-details-page">
      <div className="personal-details-container">
        <h2>Edit Personal Details</h2>

        {/* Verify Profile */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("verifyProfile")}>
            <span>Verify your profile</span>
            <span>{openSection === "verifyProfile" ? "−" : "+"}</span>
          </div>
          {openSection === "verifyProfile" && (
            <div className="detail-content">
              <p>Upload your photo and verify your government ID to build trust.</p>
              <input type="file" />
              <button>Upload</button>
            </div>
          )}
        </div>

        {/* Govt ID */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("govtId")}>
            <span>Verify your Govt. ID</span>
            <span>{openSection === "govtId" ? "−" : "+"}</span>
          </div>
          {openSection === "govtId" && (
            <div className="detail-content">
              <p>Upload your official ID document (Aadhaar, Passport, etc.)</p>
              <input type="file" />
              <button>Submit</button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("email")}>
            <span>Confirm email: chennareddy7426@gmail.com</span>
            <span>{openSection === "email" ? "−" : "+"}</span>
          </div>
          {openSection === "email" && (
            <div className="detail-content">
              <input type="email" placeholder="Enter new email" />
              <button>Update Email</button>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("phone")}>
            <span>Phone Number: +91 7702378202</span>
            <span>{openSection === "phone" ? "−" : "+"}</span>
          </div>
          {openSection === "phone" && (
            <div className="detail-content">
              <input type="tel" placeholder="Enter new phone number" />
              <button>Update Phone</button>
            </div>
          )}
        </div>

        {/* About You */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("about")}>
            <span>About You</span>
            <span>{openSection === "about" ? "−" : "+"}</span>
          </div>
          {openSection === "about" && (
            <div className="detail-content">
              <textarea placeholder="Write something about yourself..." rows="4"></textarea>
              <button>Save Bio</button>
            </div>
          )}
        </div>

        {/* Travel Preferences */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("preferences")}>
            <span>Edit travel preferences</span>
            <span>{openSection === "preferences" ? "−" : "+"}</span>
          </div>
          {openSection === "preferences" && (
            <div className="detail-content">
              <label>
                Do you allow smoking? 
                <select>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </label>
              <label>
                Music preference:
                <select>
                  <option>Anything is fine</option>
                  <option>No music</option>
                  <option>Soft music</option>
                </select>
              </label>
              <button>Save Preferences</button>
            </div>
          )}
        </div>

        {/* Vehicle */}
        <div className="detail-item">
          <div className="detail-header" onClick={() => toggleSection("vehicle")}>
            <span>Vehicles</span>
            <span>{openSection === "vehicle" ? "−" : "+"}</span>
          </div>
          {openSection === "vehicle" && (
            <div className="detail-content">
              <label>Vehicle Name:</label>
              <input type="text" placeholder="Enter vehicle name" />
              <label>Vehicle Number:</label>
              <input type="text" placeholder="Enter registration number" />
              <button>Add Vehicle</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
