import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Here you can add your signup logic (API call, validation, etc.)
    navigate("/home"); // Redirect to home page after signup
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account 🚗</h2>
        <p className="auth-subtext">Join RideShare and start your journey today</p>

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
