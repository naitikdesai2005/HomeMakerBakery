import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    try {
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error("Error parsing cartItems from localStorage", error);
      return {};
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  // Sync cartItems to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch the food list on component mount
  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/user/getallitem`);
    setFoodList(response.data.data);
  };

  // Fetch user's cart data from the backend and sync with frontend state
  const loadCartData = async (token) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;

    // Fetch cart data from localStorage or backend
    const savedCart = localStorage.getItem(`cartItems_${u_id}`);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      try {
        const response = await axios.post(
          `${url}/api/cart/getCart`,
          { userId: u_id },
          { headers: { token } }
        );
        setCartItems(response.data.cartData);
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    }
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;

    // Update frontend state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // Update backend
    try {
      await axios.post(
        `${url}/api/cart/addCart`,
        { itemId, userId: u_id },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;

    // Update frontend state
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      deleteFromCart(itemId);
    }

    // Update backend
    try {
      await axios.post(
        `${url}/api/cart/removeCart`,
        { itemId, userId: u_id },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Delete item from cart completely
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  // Get total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {
        console.error("Error calculating total amount:", error);
      }
    }
    return totalAmount;
  };

  // Get total items count in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

  // Sync cart data when the user logs in
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  // Logout user
  const logout = () => {
    if (token) {
      const decode = jwtDecode(token);
      const u_id = decode.id;
      localStorage.setItem(`cartItems_${u_id}`, JSON.stringify(cartItems));
    }

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setCartItems({});
    navigate("/");
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
