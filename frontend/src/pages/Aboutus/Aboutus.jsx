import React from "react";
import "./Aboutus.css";
import Navbar from "../Navbar/Navbar";
const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
      </div>
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Our Story</h2>
          <p>
            Our journey began with a love for good, homemade food. What started as a small bakery in the heart of the town has now blossomed into a beloved community hub. At Happy Bakes, we craft each treat with passion and care, from the first crack of an egg to the final sprinkle of sugar.
          </p>
          <p>
            We believe in the magic of a warm cookie, the joy of a beautifully frosted cake, and the community that food can bring together. Every bite tells a story, and we are proud to be part of so many special moments in our customers' lives.
          </p>
          <p>
            Whether it's a morning muffin with coffee or a custom cake for a special celebration, we are here to make every moment a bit sweeter. Join us at Happy Bakes, where every visit is a treat, and every treat is a story.
          </p>
          <p className="signature">
            Adam Smith<br />
            Owner, Happy Bakes
          </p>
        </div>
        <div className="about-us-image">
          <img src="../../images/cake.jpg" alt="Our Chef" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Aboutus;
