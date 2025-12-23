import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create Context
const CartContext = createContext();

// 2. Create Provider (Component that wraps the App)
export const CartProvider = ({ children }) => {
  // Try to read from localStorage first to not lose cart on reload
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage every time cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function: Add product
  const addToCart = (product, size) => {
    // Create unique ID for this item (in case they buy same jersey in different sizes)
    const newItem = { ...product, size, cartId: Date.now() };
    setCart([...cart, newItem]);
    alert("Product added to cart! 🛒");
  };

  // Function: Remove product
  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  // Function: Calculate total
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom hook to use cart easily
export const useCart = () => useContext(CartContext);