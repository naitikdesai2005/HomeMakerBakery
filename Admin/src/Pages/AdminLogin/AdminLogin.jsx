import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const staticEmail = "admin@gmail.com";
  const staticPassword = "admin123";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (email !== staticEmail) {
      setEmailError("Invalid email. Please enter the correct admin email.");
      valid = false;
    }

    if (password !== staticPassword) {
      setPasswordError("Incorrect password.");
      valid = false;
    }

    if (!valid) return;

    console.log("Logged in with:", { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="image-container">
          <img src="/image/bac.jpg" alt="Cookies" className="cookies-image" />
        </div>
        <div className="forml-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="forml-group">
              <label>
                <FaEnvelope className="icon" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="forml-group">
              <label>
                <FaLock className="icon" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <button type="submit" className="Login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
