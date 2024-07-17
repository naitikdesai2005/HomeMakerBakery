import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[id] > 1) {
        newItems[id] -= 1;
      } else {
        delete newItems[id];
      }
      return newItems;
    });
  };

  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </StoreContext.Provider>
  );
};
