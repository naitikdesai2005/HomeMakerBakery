import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      name,
      email,
      password,
      termsAccepted,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="image-container">
          <img src="/images/bac.jpg" alt="Cookies" className="cookies-image" />
        </div>
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <FaUser className="icon" /> Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>
                <FaEnvelope className="icon" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>
                <FaLock className="icon" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label>I agree to the Terms and Conditions</label>
            </div>
            <button type="submit" className="submit-button">
              Create Account
            </button>
            <h4 className="account">
              Already Have an Account? <Link to="/login">Login</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
