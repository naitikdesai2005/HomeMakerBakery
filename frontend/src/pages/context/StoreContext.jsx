import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  const url = "http://localhost:3000";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getToken = token;

  const addToCart = async (itemId) => {
    const decode = jwtDecode(getToken);
    const u_id = decode.id;

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/addCart",
        { itemId, userId: u_id },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    const decode = jwtDecode(token);
    const u_id = decode.id;

    if (token) {
      await axios.post(
        url + "/api/cart/removeCart",
        { itemId, userId: u_id },
        { headers: { token } }
      );
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

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

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/user/getallitem");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;

    const savedCart = localStorage.getItem(`cartItems_${u_id}`);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      try {
        const response = await axios.post(
          url + "/api/cart/getCart",
          { userId: u_id },
          { headers: { token } }
        );
        setCartItems(response.data.cartData);
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    }
  };

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

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

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
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    isAuthenticated,
    setIsAuthenticated,
    deleteFromCart,
    fetchFoodList,
    logout,
    getToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
