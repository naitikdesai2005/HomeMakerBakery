import React from "react";
import HeaderBaker from "./HeaderBaker/HeaderBaker";
import Sidebar from "./Sidebar/Sidebar";
import "./HomeBaker.css";
import { Route, Routes } from "react-router-dom";
import AddItems from "./AddItems/AddItems";
import ListItems from "./ListItems/ListItems";
import Orders from "./Orders/Orders";

const HomeBaker = () => {
  return (
    <div>
      <HeaderBaker />
      <hr />
      <div className="app-content">
        <Sidebar />
        {/* <Routes>
          <Route path="/add" element={<AddItems />} />
          <Route path="/list" element={<ListItems />} />
          <Route path="/backerorder" element={<Orders />} />
        </Routes> */}
      </div>
    </div>
  );
};

export default HomeBaker;
