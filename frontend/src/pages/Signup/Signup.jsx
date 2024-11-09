import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import "./Signup.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

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
        toast.success("Sign up Successfully");
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
                  {/* <FaUser className="icon" /> Name */}
                </label>
                <FloatLabel>
                  <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="name">Enter Your Name</label>
                </FloatLabel>
              </div>
              <div className="form-group">
                <label>
                  {/* <FaEnvelope className="icon" /> Email */}
                </label>
                <FloatLabel>
                  <InputText
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Enter Your Email</label>
                </FloatLabel>
              </div>
              <div className="form-group-pass">
                <label>
                  {/* <FaLock className="icon" /> Password */}
                </label>
                <FloatLabel>
                  <Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    toggleMask
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </FloatLabel>
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
