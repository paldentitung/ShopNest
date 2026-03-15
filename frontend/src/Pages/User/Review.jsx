import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { useCart } from "../../Context/CartContext";
import BackButton from "../../Components/BackButton";
import CheckoutStepper from "../../Components/CheckoutStepper";
import MainButton from "../../Components/MainButton";

const Review = () => {
  const navigate = useNavigate();
  const { cartItems, total, cartLength } = useCart();
  const {
    shippingFormData,
    shippingMethod,
    shippingCost,
    totalWithShipping,
    paymentMethod,
    cardDetails,
  } = useContext(CheckoutContext);

  return (
    <section className="bg-(--color-background) w-full min-h-screen py-10">
      <div className="w-full max-w-6xl mx-auto flex  items-center gap-4 px-4">
        <BackButton />
        <CheckoutStepper currentStep={4} />
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        {/* Review Info */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Review Your Order</h2>

          {/* Shipping Info */}
          <div className="p-4 bg-gray-50 rounded-md flex flex-col gap-2">
            <h3 className="font-medium text-lg">Shipping Information</h3>
            <p>{shippingFormData.fullname}</p>
            <p>{shippingFormData.phone}</p>
            <p>
              {shippingFormData.address1}
              {shippingFormData.address2 && `, ${shippingFormData.address2}`}
            </p>
            <p>
              {shippingFormData.city}, {shippingFormData.state} -{" "}
              {shippingFormData.zip}
            </p>
            <p>{shippingFormData.country}</p>
          </div>

          {/* Payment Info */}
          <div className="p-4 bg-gray-50 rounded-md flex flex-col gap-2">
            <h3 className="font-medium text-lg">Payment Method</h3>
            <p>
              {paymentMethod === "card"
                ? "Credit / Debit Card"
                : "Cash on Delivery"}
            </p>
            {paymentMethod === "card" && (
              <>
                <p>Cardholder: {cardDetails.cardholder}</p>
                <p>
                  Card Number: **** **** **** {cardDetails.cardNumber.slice(-4)}
                </p>
                <p>Expiry: {cardDetails.expiry}</p>
              </>
            )}
          </div>

          <MainButton
            name="Place Order"
            onClick={() => {
              alert("Order placed successfully!");
              navigate("/user");
            }}
          />
        </div>

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
            <span className="text-sm">Shipping ({shippingMethod})</span>
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

export default Review;
