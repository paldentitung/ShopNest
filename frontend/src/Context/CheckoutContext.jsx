import { createContext, useState, useMemo } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingFormData, setShippingFormData] = useState({
    fullname: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const { total, cartItems, removeItem, setCartItems } = useCart();
  const updateShipping = (method) => {
    setShippingMethod(method);
    if (method === "standard") setShippingCost(0);
    else if (method === "express") setShippingCost(9.99);
    else if (method === "overnight") setShippingCost(24.99);
  };

  const totalWithShipping = useMemo(
    () => total + shippingCost,
    [total, shippingCost],
  );

  console.log("total", totalWithShipping);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prev) => ({ ...prev, [name]: value }));
  };
  const userToken = localStorage.getItem("ShopNext-token");

  const placeOrder = async () => {
    const payload = {
      items: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
      })),
      shippingMethod,
      paymentMethod: method === "card" ? "Online" : "COD",
      shippingAddress: {
        name: shippingFormData.fullname,
        phone: shippingFormData.phone,
        city: shippingFormData.city,
        address: `${shippingFormData.address1}${shippingFormData.address2 ? ", " + shippingFormData.address2 : ""}`,
      },
    };

    try {
      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const order = await res.json();

      Swal.fire({ title: "Order placed!", icon: "success" }).then(() => {
        navigate("/user");
      });

      setCartItems([]);
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  };
  return (
    <CheckoutContext.Provider
      value={{
        shippingMethod,
        shippingCost,
        updateShipping,
        totalWithShipping,
        shippingFormData,
        setShippingFormData,
        handleChange,
        cardDetails,
        setCardDetails,
        method,
        setMethod,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
