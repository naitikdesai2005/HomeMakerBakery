import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login SuccessFull! ", {
      email,
      password,
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="image-container">
          <img src="/images/bac.jpg" alt="Cookies" className="cookies-image" />
        </div>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="forml-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <button type="submit" className="Login-button">
              Login
            </button>
            <h4 className="account">
              Don't Have an Account?<Link to="/signup"> Sign up</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
