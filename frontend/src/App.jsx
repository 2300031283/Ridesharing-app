import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import OfferRidePage from "./components/OfferRidePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/offer-ride" element={<OfferRidePage />} />
    </Routes>
  );
}

export default App;
