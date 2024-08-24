import React, { useContext, useState } from "react";
import "./HeaderBaker.css";
import { assets } from "../../../images/assets";

const HeaderBaker = () => {
  return (
    <div className="baker-nav">
      <img
        className="logo"
        src="../../images/1.jpg"
        alt=""
        height={"80px"}
        width={"250px"}
      />
      <img
        className="profile"
        src={assets.login_icon}
        alt=""
        height={"30px"}
        width={"30px"}
      />
    </div>
  );
};

export default HeaderBaker;
