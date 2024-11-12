import React, { useContext, useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { StoreContext } from "../context/StoreContext";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar";
import axios from "axios"; // If axios is not installed, run `npm install axios`

function ContactForm() {
  const { isAuthenticated } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending form data to the backend
      const response = await axios.post("http://localhost:3000/api/user/createContactus", formData);
      if (response.data.success) {
        setResponseMessage("Your message has been submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form on success
      } else {
        setResponseMessage("Failed to submit your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="cform-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cform-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cform-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cform-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-submit-button">
            Submit
          </button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Contact us for questions, technical assistance, or collaboration
            opportunities via the contact information provided.
          </p>
          <ul>
            <li>
              <i className="fa fa-phone"></i> +123-456-7890
            </li>
            <li>
              <i className="fa fa-envelope"></i> hello@reallygreatsite.com
            </li>
            <li>
              <i className="fa fa-map-marker"></i> 123 Anywhere ST., Any City,
              12345
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
