import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./Signup.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted", {
  //     name,
  //     email,
  //     password,
  //     termsAccepted,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setEmail("");
    setPassword("");
    setName("");

    if (!email) {
      alert("Please enter your email.");
      valid = false;
    }

    if (!password) {
      alert("Please enter your password.");
      valid = false;
    }

    if (!name) {
      alert("Please enter your Name.");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/registerUser",
        {
          email,
          password,
          name,
        }
      );
      if (response.data.success) {
        console.log("SignUp Successful!", response.data);
        localStorage.setItem("token", response.data.token);
        toast.success("Sign up Succesfully");
        if (response.data.message === "user") {
          navigate("/homeuser");
          console.log("user");
        }
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <div className="image-container">
            <img
              src="/images/bac.jpg"
              alt="Cookies"
              className="cookies-image"
            />
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
                  required
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
    </>
  );
}

export default Signup;
