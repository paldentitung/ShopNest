import { createContext, useState, useMemo } from "react";
import { useCart } from "./CartContext";

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

  const { total } = useCart();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prev) => ({ ...prev, [name]: value }));
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
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
