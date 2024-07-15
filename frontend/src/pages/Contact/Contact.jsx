import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <h2>Have Questions? Reach Out To Us</h2>
      <p>
        For any questions, reservations, or special orders, feel free to contact
        us sed diam nonumy eirmod tempor invidunt ut labore et dolore.
      </p>
      <div className="contact-container">
        <div className="contact-info">
          <p>
            <i className="fas fa-envelope"></i> contact@trimbar.com
          </p>
          <p>
            <i className="fas fa-phone"></i> +88 0123 456 789
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> 62, 74th Avenue, Glendale
            NY 11385, US
          </p>
        </div>
        <div className="map-container">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7241584425724!2d-74.00601508459213!3d40.7127752793317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzQ2LjAiTiA3NMKwMDAnMTUuMCJX!5e0!3m2!1sen!2sus!4v1631553724299!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
