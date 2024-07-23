import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        console.log("Login Successful!", response.data);
        localStorage.setItem("token", response.data.token);
        if (response.data.message === "admin") {
          navigate("/homeadmin");
          console.log("admin");
        } else if (response.data.message === "user") {
          navigate("/homeuser");
          console.log("user");
        } else if (response.data.message === "baker") {
          navigate("/homebaker");
          console.log("baker");
        }
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
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
