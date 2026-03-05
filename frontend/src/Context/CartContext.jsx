import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart } from "../Services/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const data = await getCart();
    setCartItems(data.items || []);
  };

  const addItem = async (productId, quantity) => {
    await addToCart({ productId, quantity });
    fetchCart();
  };

  const removeItem = async (productId) => {};

  const updateItemQuantity = async (productId, quantity) => {};

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal =
    cartItems.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0,
    ) / 100;
  const tax = subtotal * 0.14;
  const total = subtotal + tax;
  const cartLength = cartItems.length;

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        tax,
        total,
        addItem,
        fetchCart,
        cartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
