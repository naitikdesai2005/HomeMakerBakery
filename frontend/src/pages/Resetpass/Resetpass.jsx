import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Resetpass.css";

function ResetPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state } = useLocation(); // Get the email from location state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/resetPassword",
        { email: state.email, code, password, confirmPassword }
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Reset Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="reset-password-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
