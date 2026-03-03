import React, { useState } from "react";
import MainButton from "../../Components/MainButton";
import CheckoutStepper from "../../Components/CheckoutStepper";

const Payment = () => {
  const [method, setMethod] = useState("card");

  return (
    <section className="bg-(--color-background) w-full min-h-screen py-10">
      <CheckoutStepper currentStep={3} />
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Payment Method</h2>

          <div className="flex flex-col gap-4">
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
                  placeholder="Cardholder Name"
                  className="p-3 border border-gray-300 rounded-md outline-none
                             transition-all duration-200
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="Card Number"
                  className="p-3 border border-gray-300 rounded-md outline-none
                             transition-all duration-200
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="p-3 border border-gray-300 rounded-md outline-none
                               transition-all duration-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
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
        </div>

        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-4 h-fit sticky top-10 z-30">
          <h2 className="text-center font-semibold text-lg">Order Summary</h2>

          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 p-2 rounded-md"
              >
                <div>
                  <img
                    src="https://via.placeholder.com/40"
                    alt="product"
                    className="w-10 h-10 rounded border"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm">
                      Air Max Sneakers
                    </span>
                    <p className="text-xs text-gray-400">Size 10 · White</p>
                  </div>
                  <div className="font-semibold text-sm">$199.99</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal (9 items)</span>
              <span>$1000.00</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-lime-700">Free</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-lime-700">-$25.00</span>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-sm">Total</span>
            <span className="text-xl font-semibold">$975.00</span>
          </div>

          <MainButton name="Pay Now (Demo)" />
        </div>
      </div>
    </section>
  );
};

export default Payment;
