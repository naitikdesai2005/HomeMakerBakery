import React, { useState } from "react";
import UserNavbar from "./UserNavbar/UserNavbar.jsx";
import Menu from "../pages/menu/Menu.jsx";
import Footer from "../pages/Footer/Footer.jsx";
import ProductDisplay from "../pages/ProductDisplay/ProductDisplay.jsx";

const HomeUser =()=>{
    const [category, setCategory] = useState("All");


    return(
        <>
       <div>
      <UserNavbar />
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
        </>
    )
}

export default HomeUser;