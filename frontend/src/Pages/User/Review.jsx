import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { useCart } from "../../Context/CartContext";
import BackButton from "../../Components/common/BackButton";
import CheckoutStepper from "../../Components/checkout/CheckoutStepper";
import MainButton from "../../Components/common/MainButton";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Review = () => {
  const navigate = useNavigate();
  const { cartItems, total, cartLength, setCartItems } = useCart();
  const {
    shippingFormData,
    shippingMethod,
    shippingCost,
    totalWithShipping,
    paymentMethod,
    cardDetails,
    placeOrder,
  } = useContext(CheckoutContext);

  return (
    <section className="bg-(--color-background) w-full min-h-screen py-10">
      <div className="w-full max-w-6xl mx-auto flex items-center gap-4 px-4 mb-8">
        <BackButton />
        <CheckoutStepper currentStep={4} />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 px-4">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Review Your Order
          </h2>

          {/* Shipping Info */}
          <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-400">
                Shipping
              </h3>
              <span className="text-xs text-indigo-500 cursor-pointer hover:underline">
                Edit
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              <p className="font-medium text-gray-900">
                {shippingFormData.fullname}
              </p>
              <p>{shippingFormData.phone}</p>
              <p>
                {shippingFormData.address1}
                {shippingFormData.address2 && `, ${shippingFormData.address2}`}
              </p>
              <p>
                {shippingFormData.city}, {shippingFormData.state} –{" "}
                {shippingFormData.zip}
              </p>
              <p>{shippingFormData.country}</p>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-400">
                Payment
              </h3>
              <span className="text-xs text-indigo-500 cursor-pointer hover:underline">
                Edit
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              <p className="font-medium text-gray-900">
                {paymentMethod === "card"
                  ? "Credit / Debit Card"
                  : "Cash on Delivery"}
              </p>
              {paymentMethod === "card" && (
                <>
                  <p>{cardDetails.cardholder}</p>
                  <p>•••• •••• •••• {cardDetails.cardNumber.slice(-4)}</p>
                  <p>Expires {cardDetails.expiry}</p>
                </>
              )}
            </div>
          </div>

          <MainButton name="Place Order" onClick={placeOrder} />

          <p className="text-xs text-gray-400 text-center -mt-2">
            By placing your order, you agree to our Terms & Privacy Policy.
          </p>
        </div>

        <div className="w-full lg:w-[32%] bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 sticky top-10 h-fit max-h-[85vh] overflow-y-auto">
          <h2 className="font-semibold text-base">Order Summary</h2>

          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={`${item.product.images[0]}`}
                    alt={item.product.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-800 truncate pr-2">
                    {item.product.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900 shrink-0">
                    ${(item.product.priceCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>
                Subtotal ({cartLength} {cartLength === 1 ? "item" : "items"})
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping ({shippingMethod})</span>
              <span
                className={
                  shippingCost === 0 ? "text-emerald-600 font-medium" : ""
                }
              >
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ${totalWithShipping.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
