import React, { useState } from "react";
import UserNavbar from "./UserNavbar/UserNavbar.jsx";
import Menu from "../pages/menu/Menu.jsx";
import Footer from "../pages/Footer/Footer.jsx";
import ProductDisplay from "../pages/ProductDisplay/ProductDisplay.jsx";

const HomeUser = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div>
        <UserNavbar />
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
    </>
  );
};

export default HomeUser;
