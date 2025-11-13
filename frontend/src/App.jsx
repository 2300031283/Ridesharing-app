import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import OfferRidePage from "./components/OfferRidePage.jsx";
import HomePage1 from "./components/HomePage1.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import PersonalDetailsPage from "./components/PersonalDetailsPage.jsx";
import SearchResultsPage from "./components/SearchResultsPage.jsx";
import YourRides from "./components/YourRides.jsx";
import InboxPage from "./components/InboxPage.jsx";
import PaymentsPage from "./components/PaymentsPage.jsx";
import TransfersPage from "./components/TransfersPage.jsx";
import RefundsPage from "./components/RefundsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/offer-ride" element={<OfferRidePage />} />
      <Route path="/homepage1" element={<HomePage1 />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/your-rides" element={<YourRides />} />
      <Route path="/inbox" element={<InboxPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/transfers" element={<TransfersPage />} />
      <Route path="/refunds" element={<RefundsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/personal-details" element={<PersonalDetailsPage />} />
    </Routes>
  );
}

export default App;
