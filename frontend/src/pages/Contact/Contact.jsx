import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { StoreContext } from "../context/StoreContext";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar";
import axios from "axios";

function ContactForm() {
  const { isAuthenticated } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/createContactus",
        formData
      );
      if (response.data.success) {
        setResponseMessage("Your message has been submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setResponseMessage("Failed to submit your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="bg-white flex w-full max-w-4xl rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
              <p className="text-gray-600 text-sm">
                We'd love to hear from you. Send us a message!
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-semibold mb-1 text-sm"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f79c3e] text-sm"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-semibold mb-1 text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f79c3e] text-sm"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-800 font-semibold mb-1 text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f79c3e] text-sm"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-semibold mb-1 text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f79c3e] text-sm"
                  rows="4"
                  required
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 bg-gradient-to-r from-[#f79c3e] to-[#f79c3e] text-white font-semibold rounded-lg transition-all duration-300 text-sm ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#e68a2c] focus:ring-4 focus:ring-[#f79c3e]"
                }`}
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
            {responseMessage && (
              <p className="mt-4 text-center text-green-600 font-medium text-sm">
                {responseMessage}
              </p>
            )}
          </div>
          <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-50 rounded-r-lg p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Reach Out</h2>
              <p className="text-gray-700 mt-2 text-sm">
                For questions or assistance, contact us using the details below.
              </p>
              <ul className="mt-4 space-y-1 text-gray-700 text-sm">
                <li className="flex items-center">
                  <i className="fa fa-phone mr-2"></i> +123-456-7890
                </li>
                <li className="flex items-center">
                  <i className="fa fa-envelope mr-2"></i>{" "}
                  hello@reallygreatsite.com
                </li>
                <li className="flex items-center">
                  <i className="fa fa-map-marker mr-2"></i> 123 Anywhere St.,
                  Any City, 12345
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
