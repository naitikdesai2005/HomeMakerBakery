import React from "react";
import HeaderBaker from "./HeaderBaker/HeaderBaker";
import Sidebar from "./Sidebar/Sidebar";
import "./HomeBaker.css";

const HomeBaker = () => {
  return (
    <div>
      <HeaderBaker />
      <hr />
      <div className="app-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomeBaker;
