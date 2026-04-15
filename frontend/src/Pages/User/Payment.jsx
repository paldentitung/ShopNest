import React, { useState, useContext } from "react";
import MainButton from "../../Components/common/MainButton";
import CheckoutStepper from "../../Components/checkout/CheckoutStepper";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { CheckoutContext } from "../../Context/CheckoutContext";
import BackButton from "../../Components/common/BackButton";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, total, cartLength } = useCart();
  const {
    shippingMethod,
    shippingCost,
    totalWithShipping,
    handleChange,
    cardDetails,
    setCardDetails,
    method,
    setMethod,
  } = useContext(CheckoutContext);

  const handleContinue = () => {
    if (method === "card") {
      const { cardholder, cardNumber, expiry, cvc } = cardDetails;
      if (!cardholder || !cardNumber || !expiry || !cvc) {
        alert("Please fill in all card details before proceeding.");
        return;
      }
    }

    if (!method) {
      alert("Please select a payment method.");
      return;
    }

    navigate("/review");
  };
  return (
    <section className="bg-(--color-background) w-full min-h-screen py-10">
      <div className="flex items-center gap-4 w-full max-w-6xl mx-auto px-4">
        <BackButton />
        <CheckoutStepper currentStep={3} />
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Payment Method</h2>

          <div className="flex flex-col gap-4">
            {/* Card */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={method === "card"}
                onChange={() => setMethod("card")}
              />
              <span className="font-medium">Credit / Debit Card</span>
            </label>

            {method === "card" && (
              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  name="cardholder"
                  placeholder="Cardholder Name"
                  value={cardDetails.cardholder}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md outline-none
                             transition-all duration-200
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md outline-none
                             transition-all duration-200
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM / YY"
                    value={cardDetails.expiry}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md outline-none
                               transition-all duration-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={cardDetails.cvc}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md outline-none
                               transition-all duration-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input
                type="radio"
                name="payment"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
              />
              <span className="font-medium">Cash on Delivery</span>
            </label>

            {method === "cod" && (
              <div className="p-4 bg-gray-50 rounded-md text-sm text-gray-600 mt-2">
                Pay with cash when your order is delivered.
              </div>
            )}
          </div>

          <MainButton name="Proceed to Review" onClick={handleContinue} />
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-3 h-100 overflow-y-scroll sticky top-10 z-30">
          <h2 className="text-center font-semibold text-lg">Order Summary</h2>

          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-2 p-1 rounded-md shadow-xs"
              >
                <img
                  src={`http://localhost:3000/${item.product.images[0]}`}
                  alt=""
                  className="w-10 h-10 object-contain"
                />
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-semibold text-sm">
                    {item.product.name}
                  </span>
                  <span className="font-semibold text-sm">
                    ${item.product.priceCents / 100}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Subtotal ({cartLength} items)</span>
            <span className="text-sm">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Shipping({shippingMethod})</span>
            <span className="text-sm text-lime-700">
              {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="border border-(--color-border)"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Total</span>
            <span className="text-lg md:text-2xl font-semibold">
              ${totalWithShipping.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
