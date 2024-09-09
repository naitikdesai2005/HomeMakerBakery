import React, { useState,useContext } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Menu from "./menu/Menu.jsx";
import Footer from "./Footer/Footer.jsx";
import "./Home.css";
import ProductDisplay from "./ProductDisplay/ProductDisplay.jsx";
import { StoreContext } from "./context/StoreContext.jsx";
import UserNavbar from "../HomeUser/UserNavbar/UserNavbar.jsx";

function Homepage() {
  const [category, setCategory] = useState("All");
  const {
    isAuthenticated,
  } = useContext(StoreContext);
  return (
    <div>
       {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="mainpage" id="home">
        <div className="mainpage-content">
          <h1>Delicious</h1>
          <br />
          <br />
          <h1>&nbsp;&nbsp;Bakery</h1>
          <h1>&nbsp;Shop!</h1>
          <br />
          <h5>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
            impedit nihil totam error laborum! Modi dolore necessitatibus veniam
            maxime distinctio!
          </h5>
          <a href="#menu">
            <button className="know-button">Know more</button>
          </a>
        </div>
        <img src="/images/home.jpg" alt="background" />
      </div>
      <Menu category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
      <Footer />
    </div>
  );
}

export default Homepage;
