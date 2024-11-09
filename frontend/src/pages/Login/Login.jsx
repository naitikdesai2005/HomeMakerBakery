import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

// Import PrimeReact components
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setToken, setIsAuthenticated } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Please enter your email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password }
      );

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        console.log("Login Successful!", response.data);
        toast.success("Login Successful");

        if (response.data.message === "admin") {
          navigate("/homeadmin");
        } else if (response.data.message === "user") {
          navigate("/homeuser");
        } else if (response.data.message === "baker") {
          navigate("/homebaker");
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <div className="image-container">
            <img
              src="/images/bac.jpg"
              alt="Cookies"
              className="cookies-image"
            />
          </div>
          <div className="forml-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="forml-group">
                <FloatLabel>
                  <InputText
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  />
                  <label htmlFor="email">Email</label>
                </FloatLabel>
                {emailError && <p className="error">{emailError}</p>}
              </div>
              <div className="forml-group">
                <FloatLabel>
                  <InputText
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </FloatLabel>
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
              <button type="submit" className="Login-button">
                Login
              </button>
              <div className="forgot-password-link">
                <Link to="/forgetpass">Forgot Password?</Link>
              </div>
              <h4 className="account">
                Don't Have an Account?<Link to="/signup"> Sign up</Link>
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
