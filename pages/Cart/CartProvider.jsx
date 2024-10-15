import React, { useEffect, useState, createContext } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        return item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    });
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updateCart = prevCart.map((item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      });
      return updateCart.filter((item) => item != null);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
