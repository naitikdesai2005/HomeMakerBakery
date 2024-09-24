import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const StoreContextProvider = (props) => {
  // const [cartItems, setCartItems] = useState(() => {
  //   const savedCart = localStorage.getItem("cartItems");
  //   return savedCart ? JSON.parse(savedCart) : {};
  // });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    try {
      return savedCart ? JSON.parse(savedCart) : {}; // Return parsed cartItems or an empty object if no cart exists
    } catch (error) {
      console.error("Error parsing cartItems from localStorage", error);
      return {}; // Fallback to empty cart on error
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

  // const addToCart = async (itemId) => {
  //   console.log(getToken);
  //   const decode = jwtDecode(getToken);
  //   const u_id = decode.id;
  //   console.log(u_id);
  //   console.log(decode);

  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   }
  //   if (token) {
  //     await axios.post(
  //       url + "/api/cart/addCart",
  //       { itemId, u_id },
  //       { headers: { token } }
  //     );
  //   }
  // };

  const addToCart = async (itemId) => {
    const decode = jwtDecode(getToken); // Decode token to get userId
    const u_id = decode.id; // Extract user ID from decoded token
  
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  
    if (token) {
      // Send request to backend to add item to cart
      await axios.post(
        url + "/api/cart/addCart",
        { itemId, userId: u_id }, // Send userId and itemId
        { headers: { token } }
      );
    }
  };
  

  // const removeFromCart = async (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   const u_id = decode.id;
  //   console.log(u_id);
  //   if (token) {
  //     await axios.post(
  //       url + "/api/cart/removeCart",
  //       { itemId, u_id },
  //       { headers: { token } }
  //     );
  //   }
  // };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    const decode = jwtDecode(token); // Decode token to get userId
    const u_id = decode.id; // Extract user ID
  
    if (token) {
      // Send request to backend to remove item from cart
      await axios.post(
        url + "/api/cart/removeCart",
        { itemId, userId: u_id }, // Send userId and itemId
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

  // const loadCartData = async (token) => {
  //   const response = await axios.post(
  //     url + "/api/cart/getCart",
  //     {},
  //     { headers: { token } }
  //   );
  //   setCartItems(response.data.cartData);
  // };

  // const loadCartData = async (token) => {
  //   const decode = jwtDecode(token); // Decode token to get userId
  //   const u_id = decode.id; // Extract user ID
  
  //   const response = await axios.post(
  //     url + "/api/cart/getCart",
  //     { userId: u_id }, // Send userId
  //     { headers: { token } }
  //   );
  
  //   setCartItems(response.data.cartData); // Set cart data from response
  // };

  const loadCartData = async (token) => {
    const decode = jwtDecode(token);
    const u_id = decode.id;
  
    // Check if cart data exists in localStorage for this user
    const savedCart = localStorage.getItem(`cartItems_${u_id}`);
    if (savedCart) {
      // Restore the cart from localStorage
      setCartItems(JSON.parse(savedCart));
    } else {
      // If no saved cart, fetch from backend or start with an empty cart
      try {
        const response = await axios.post(
          url + "/api/cart/getCart",
          { userId: u_id }, // Send userId to fetch cart
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
      await fetchFoodList(); // Fetch food list from the backend
      
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        await loadCartData(storedToken); // Restore cart from localStorage or backend
      }
    }
    loadData();
  }, []);
  
  

  // useEffect(() => {
  //   async function loadData() {
  //     await fetchFoodList();
  //     const storedToken = localStorage.getItem("token");
  //     if (storedToken) {
  //       setToken(storedToken);
  //       setIsAuthenticated(true);
  //       await loadCartData(storedToken);
  //     }
  //   }
  //   loadData();
  // }, []);

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setIsAuthenticated(false);
  //   navigate("/");
  //   setToken(null);
  //   setCartItems({});
  // };

  // const logout = async () => {
  //   if (token) {
  //     try {
  //       const decode = jwtDecode(token);
  //       const u_id = decode.id;
  //       await axios.post(
  //         url + "/api/cart/getCart",
  //         { cartItems, u_id },
  //         { headers: { token } }
  //       );
  //     } catch (error) {
  //       console.error("Error saving cart on logout:", error);
  //     }
  //   }

  //   localStorage.removeItem("token");
  //   setIsAuthenticated(false);
  //   setToken(null);
  //   setCartItems({});
  //   navigate("/");
  // };

  const logout = () => {
    if (token) {
      const decode = jwtDecode(token);
      const u_id = decode.id;
      
      // Save cart to localStorage with the user ID as the key
      localStorage.setItem(`cartItems_${u_id}`, JSON.stringify(cartItems));
    }
  
    // Clear token and cart
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
