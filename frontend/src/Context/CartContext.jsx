import { createContext, useContext, useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../Services/cartApi";

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

  const removeItem = async (cartItemId) => {
    await removeFromCart(cartItemId);
    setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
  };

  const updateItemQuantity = async (cartItemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      await updateCartQuantity(cartItemId, newQuantity);
    } catch (error) {
      console.error(error);
      fetchCart();
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal =
    cartItems.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0,
    ) / 100;
  const tax = subtotal * 0.14;
  const total = subtotal + tax;
  const cartLength = cartItems.length;

  const MIN_QTY = 1;
  const MAX_QTY = 10;

  const increaseQuantity = (cartItemId) => {
    const item = cartItems.find((i) => i._id === cartItemId);
    if (item && item.quantity < MAX_QTY) {
      updateItemQuantity(cartItemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (cartItemId) => {
    const item = cartItems.find((i) => i._id === cartItemId);
    if (item && item.quantity > MIN_QTY) {
      updateItemQuantity(cartItemId, item.quantity - 1);
    }
  };
  useEffect(() => {
    fetchCart();
    console.log("cart data", cartItems);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalItems,
        subtotal,
        tax,
        total,
        addItem,
        fetchCart,
        cartLength,
        removeItem,
        updateItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        MAX_QTY,
        MIN_QTY,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
