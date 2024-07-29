import "./BakerRegister.css";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaStore,
  FaPhone,
  FaHome,
  FaCreditCard,
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Container from "postcss/lib/container";

function BakerRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setBakerName] = useState("");
  const [bakeryname, setBakeryName] = useState("");
  const [mobilenumber, setPhone] = useState("");
  const [bakeryaddress, setAddress] = useState("");
  const [bankAccNumber, setBankAccNumber] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Register SuccessFull! ", {
  //     email,
  //     password,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setEmail("");
    setPassword("");
    setAddress("");
    setBakerName("");
    setBakeryName("");
    setBankAccNumber("");
    setPhone("");

    if (!email) {
      alert("Please enter your email.");
      valid = false;
    }

    if (!password) {
      alert("Please enter your password.");
      valid = false;
    }

    if (!name) {
      setBakerName("Please enter your Name.");
      valid = false;
    }

    if (!bakeryname) {
      setBakeryName("Please enter your Bakery Name.");
      valid = false;
    }
    if (!mobilenumber) {
      alert("Please enter your Phone Number.");
      valid = false;
    }

    if (!bakeryaddress) {
      setAddress("Please enter your Address.");
      valid = false;
    }

    if (!bankAccNumber) {
      alert("Please enter your Account Details.");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/baker/registerBaker",
        {
          email,
          password,
          name,
          bakeryname,
          mobilenumber,
          bakeryaddress,
          bankAccNumber,
        }
      );
      if (response.data.success) {
        console.log("Registration Successful!", response.data);
        localStorage.setItem("token", response.data.token);
        // if (response.data.message === "baker") {
        navigate("/homebaker");
        console.log("baker");
        // }
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
      <div className="register-container">
        <div className="Register-form">
          <div className="Register-title">
            <h1>Register as a Baker</h1>
          </div>
          <div className="Register-formfield">
            <form onSubmit={handleSubmit}>
              <div className="register-form-group">
                <label>
                  <FaUser className="icon" /> Baker Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setBakerName(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaStore className="icon" /> Bakery Name
                </label>
                <input
                  type="text"
                  value={bakeryname}
                  onChange={(e) => setBakeryName(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaEnvelope className="icon" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaPhone className="icon" /> Phone No.
                </label>
                <input
                  type="phone"
                  value={mobilenumber}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaLock className="icon" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaHome className="icon" /> Address
                </label>
                <input
                  type="text"
                  value={bakeryaddress}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaCreditCard className="icon" /> Bank Account Number
                </label>
                <input
                  type="text"
                  value={bankAccNumber}
                  onChange={(e) => setBankAccNumber(e.target.value)}
                />
              </div>
              <button type="submit" className="Register-button">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BakerRegister;
