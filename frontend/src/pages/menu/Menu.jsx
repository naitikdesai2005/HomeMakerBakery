import React, { useState } from "react";
import "./Menu.css";
import { StoreContextProvider } from "../context/StoreContext";
import { food_list } from "../../../images/assets.js";
import Product from "../Product/Product.jsx";

const menuItems = [
  { name: "Cakes", image: "./images/cake.jpg" },
  { name: "Waffles", image: "./images/waffel.jpg" },
  { name: "Cupcakes", image: "./images/donat.jpg" },
  { name: "Macarons", image: "./images/macroon.jpeg" },
  { name: "Doughnuts", image: "./images/doughnut.jpg" },
  { name: "Chocolates", image: "./images/choclates.jpeg" },
];

const Menu = ({ category, setCategory }) => {
  return (
    <div className="menu-container" id="menu">
      <h1>Shop by category</h1>
      <div className="menu-items">
        {menuItems.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.name ? "All" : item.name))
              }
              key={index}
              className="menu-item"
            >
              <img
                className={category === item.name ? "active" : ""}
                src={item.image}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Menu;
