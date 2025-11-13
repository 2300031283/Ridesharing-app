import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api"; // adjust path if necessary
import "./signuppage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // basic client-side validation
    if (!email || !password || !fullName) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // backend User entity expects email, password, role (role optional)
          email,
          password,
          role: "user",
        }),
      });

      const data = await res.json();
      setLoading(false);

      // If backend returns a status field
      if (!res.ok || data.status === "error") {
        setError(data.message || "Signup failed. Try again.");
        return;
      }

      // Success — show success message
      setSuccess(true);
      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Signup error:", err);
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account 🚗</h2>
        <p className="auth-subtext">Join RideShare and start your journey today</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}
        {success && (
          <div style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#d4edda",
            border: "2px solid #28a745",
            borderRadius: 8,
            color: "#155724",
            textAlign: "center",
            fontWeight: "bold",
            animation: "slideIn 0.5s ease-in"
          }}>
            ✅ Signup Successful! Redirecting to login...
          </div>
        )}

        <p className="auth-footer">
          Already have an account?{" "}
          <span style={{ cursor: "pointer", color: "#0b62ff" }} onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
