import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Forgetpass.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/forgotPassword",
        { email }
      );
      if (response.data.success) {
        navigate("/resetpass", { state: { email } });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <button type="submit" className="forget-password-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
