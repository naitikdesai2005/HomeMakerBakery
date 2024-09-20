import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
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
    console.log(getToken);
    const decode = jwtDecode(getToken);
    const u_id = decode.id;
    console.log(u_id);
    console.log(decode);

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/addCart",
        { itemId, u_id },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    const u_id = decode.id;
    console.log(u_id);
    if (token) {
      await axios.post(
        url + "/api/cart/removeCart",
        { itemId, u_id },
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
    const response = await axios.post(
      url + "/api/cart/getCart",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
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
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    // setToken(null);
    // setCartItems({});
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
