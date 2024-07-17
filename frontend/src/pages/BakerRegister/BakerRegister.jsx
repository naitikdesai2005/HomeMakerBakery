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
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

function BakerRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bakerName, setBakerName] = useState("");
  const [bakeryName, setBakeryName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccNumber, setBankAccNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register SuccessFull! ", {
      email,
      password,
    });
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
                  value={bakerName}
                  onChange={(e) => setBakerName(e.target.value)}
                />
              </div>
              <div className="register-form-group">
                <label>
                  <FaStore className="icon" /> Bakery Name
                </label>
                <input
                  type="text"
                  value={bakeryName}
                  onChange={(e) => setBakeryName(e.target.value)}
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
                  value={phone}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
