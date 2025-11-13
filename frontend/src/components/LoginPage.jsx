import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api"; // adjust path if needed
import "./Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.status === "error") {
        // backend returns { status: "error", message: "..." } for invalid credentials
        setError(data.message || "Login failed. Check credentials.");
        return;
      }

      // success: backend returns { status: "ok", user: { ... } }
      const user = data.user ?? data; // fallback if API returns raw user
      // persist user (simple approach). In production use tokens + secure storage.
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to homepage after login
      navigate("/homepage1");
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back!</h2>
        <p className="auth-subtext">Log in to continue to RideShare</p>

        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

        <p className="auth-footer">
          Don't have an account?{" "}
          <span style={{ cursor: "pointer", color: "#0b62ff" }} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
