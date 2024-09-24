import React, { useState, useContext } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Menu from "./menu/Menu.jsx";
import Footer from "./Footer/Footer.jsx";
import "./Home.css";
import ProductDisplay from "./ProductDisplay/ProductDisplay.jsx";
import { StoreContext } from "./context/StoreContext.jsx";
import UserNavbar from "../HomeUser/UserNavbar/UserNavbar.jsx";

function Homepage() {
  const [category, setCategory] = useState("All");
  const { isAuthenticated } = useContext(StoreContext);
  return (
    <div>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="mainpage" id="home">
        <div className="mainpage-content">
          <h2>Baked With Love</h2>
          <br />
          <br />
          <h2>Delivered With Care!</h2>
          <br />
          <h5>
            Indulge in the sweetness of home-baked goodness, crafted with love
            and passion by talented home bakers. Each treat is made to
            perfection, just for you, bringing warmth and joy to every bite.
            Discover the magic of homemade flavors delivered right to your
            doorstep!
          </h5>
        </div>
        <img src="/images/home.jpg" alt="background" />
      </div>
      <Menu category={category} setCategory={setCategory} />
      {/* <a className="viewmore" href="/allproduct">
        view more »»
      </a> */}
      <ProductDisplay category={category} />
      <Footer />
    </div>
  );
}

export default Homepage;
