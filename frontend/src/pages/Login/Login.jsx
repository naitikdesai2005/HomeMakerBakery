// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import axios from "axios";
// import "./Login.css";
// import Navbar from "../Navbar/Navbar";
// import { toast } from "react-toastify";
// import { StoreContext } from "../context/StoreContext";

// // Import PrimeReact components
// import { InputText } from "primereact/inputtext";
// import { FloatLabel } from "primereact/floatlabel";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const { setToken, setIsAuthenticated } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let valid = true;

//     setEmailError("");
//     setPasswordError("");

//     if (!email) {
//       setEmailError("Please enter your email.");
//       valid = false;
//     }

//     if (!password) {
//       setPasswordError("Please enter your password.");
//       valid = false;
//     }

//     if (!valid) return;

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/user/login",
//         { email, password }
//       );

//       if (response.data.success) {
//         const token = response.data.token;
//         setToken(token);
//         setIsAuthenticated(true);
//         localStorage.setItem("token", token);
//         console.log("Login Successful!", response.data);
//         toast.success("Login Successful");

//         if (response.data.message === "admin") {
//           navigate("/homeadmin");
//         } else if (response.data.message === "user") {
//           navigate("/homeuser");
//         } else if (response.data.message === "baker") {
//           navigate("/homebaker");
//         }
//       }
//     } catch (error) {
//       console.error("An error occurred during login:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="login-container">
//         <div className="login-form">
//           <div className="image-container">
//             <img
//               src="/images/bac.jpg"
//               alt="Cookies"
//               className="cookies-image"
//             />
//           </div>
//           <div className="forml-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="forml-group">
//                 <FloatLabel>
//                   <InputText
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     id="email"
//                   />
//                   <label htmlFor="email">Email</label>
//                 </FloatLabel>
//                 {emailError && <p className="error">{emailError}</p>}
//               </div>
//               <div className="forml-group">
//                 <FloatLabel>
//                   <InputText
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     id="password"
//                   />
//                   <label htmlFor="password">Password</label>
//                 </FloatLabel>
//                 {passwordError && <p className="error">{passwordError}</p>}
//               </div>
//               <button type="submit" className="Login-button">
//                 Login
//               </button>
//               <div className="forgot-password-link">
//                 <Link to="/forgetpass">Forgot Password?</Link>
//               </div>
//               <h4 className="account">
//                 Don't Have an Account?<Link to="/signup"> Sign up</Link>
//               </h4>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
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
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Invalid email format.");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-4xl transform transition-all duration-500 hover:scale-105">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-l-2xl">
          <img
            src="/images/bac.jpg"
            alt="Cookies"
            className="w-3/4 h-auto rounded-full shadow-lg transform transition-all duration-300 hover:rotate-12"
          />
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-600 text-sm">Please login to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <FloatLabel>
                <InputText
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <label htmlFor="email" className="text-gray-500">
                  Email
                </label>
              </FloatLabel>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mb-6">
              <FloatLabel>
                <InputText
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <label htmlFor="password" className="text-gray-500">
                  Password
                </label>
              </FloatLabel>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300"
            >
              Login
            </button>

            <div className="text-center mt-6">
              <Link
                to="/forgetpass"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mt-4">
              <h4 className="text-gray-700">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  {" "}
                  Sign up
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
