import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu/Menu.jsx";
import Footer from "./Footer/Footer.jsx";
import Contact from "./Contact/Contact.jsx";
import "./Home.css";
import Navbar from "./Navbar/Navbar.jsx";

function Homepage() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Navbar />
      <div className="mainpage">
        <div className="mainpage-content">
          <h1>Delicious</h1>
          <h1>&nbsp;&nbsp;Bakery</h1>
          <h1>&nbsp;Shop!</h1>
          <h5>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
            impedit nihil totam error laborum! Modi dolore necessitatibus veniam
            maxime distinctio!
          </h5>
          <button className="know-button">Know more</button>
        </div>
        <img src="/images/home.jpg" alt="background" />
      </div>
      <Menu category={category} setCategory={setCategory} />
      <Contact />
      <Footer />
    </div>
  );
}

export default Homepage;
