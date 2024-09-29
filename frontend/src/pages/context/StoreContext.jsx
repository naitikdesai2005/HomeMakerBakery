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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:3000";

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
      [];
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

  const removeFromCart = async (itemId) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;

    // Check if the item exists in the cart and decrement or delete it
    if (cartItems[itemId] > 1) {
      // Update frontend state to reduce item quantity
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));

      // Update backend to decrement the item quantity
      try {
        await axios.post(
          `${url}/api/cart/removeCart`,
          { itemId, userId: u_id },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      // If quantity is 1, delete the item entirely from the cart
      deleteFromCart(itemId);

      // Remove the item from the backend as well
      try {
        await axios.post(
          `${url}/api/cart/deleteItem`,
          { itemId, userId: u_id },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }
    }
  };

  // Delete item from the cart completely on frontend
  // const deleteFromCart = async (itemId) => {
  //   setCartItems((prev) => {
  //     const newCart = { ...prev };
  //     delete newCart[itemId];
  //     return newCart;
  //   });
  // };

// Delete item from the cart completely on frontend and backend
const deleteFromCart = async (itemId) => {
  const decode = jwtDecode(token);
  const u_id = decode.id;

  // Update frontend state
  setCartItems((prev) => {
    const newCart = { ...prev };
    delete newCart[itemId];
    return newCart;
  });

  // Update backend to delete the item from the user's cart
  try {
    await axios.post(
      `${url}/api/cart/deleteItem`,
      { itemId, userId: u_id },
      { headers: { token } }
    );
  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
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
      } catch (error) {}
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
