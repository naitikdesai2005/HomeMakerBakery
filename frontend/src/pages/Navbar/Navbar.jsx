import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(StoreContext);
  const cartItemCount = getTotalCartItems();

  return (
    <nav className="flex justify-around items-center bg-white py-4 mb-20">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" onClick={() => setMenu("home")}>
          <img src="../../images/Logo.png" alt="Logo" className="h-20 w-60" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-80">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:w-96 transition-all duration-300"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4 text-gray-800">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`hover:text-[#f79c3e] ${menu === "home" ? "text-[#f79c3e]" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/aboutus"
          onClick={() => setMenu("About")}
          className={`hover:text-[#f79c3e] ${menu === "About" ? "text-[#f79c3e]" : ""}`}
        >
          About
        </Link>
        <Link
          to="/products"
          onClick={() => setMenu("Product")}
          className={`hover:text-[#f79c3e] ${menu === "Product" ? "text-[#f79c3e]" : ""}`}
        >
          Products
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenu("Contact")}
          className={`hover:text-[#f79c3e] ${menu === "Contact" ? "text-[#f79c3e]" : ""}`}
        >
          Contact
        </Link>
      </div>

      {/* Cart and Login/Register Buttons */}
      <div className="flex items-center space-x-6">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <Link to="/cart">
            <FaShoppingBasket className="h-8 w-8 text-gray-800 hover:text-[#f79c3e]" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Login and Register as Baker Buttons */}
        <Link
          to="/login"
          className="text-gray-800 border-2 border-[#58231f] py-2 px-4 rounded-full hover:bg-[#58231f] hover:text-white transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/bakerRegister"
          className="text-gray-800 border-2 border-[#58231f] py-2 px-4 rounded-full hover:bg-[#58231f] hover:text-white transition duration-200"
        >
          Baker-signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
