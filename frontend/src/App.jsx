import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import OfferRidePage from "./components/OfferRidePage.jsx";
import HomePage1 from "./components/HomePage1.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import PersonalDetailsPage from "./components/PersonalDetailsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
  <Route path="/offer-ride" element={<OfferRidePage />} />
  <Route path="/homepage1" element={<HomePage1 />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/personal-details" element={<PersonalDetailsPage />} />
    </Routes>
  );
}

export default App;
