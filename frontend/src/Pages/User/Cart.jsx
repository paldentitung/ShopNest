import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import MainButton from "../../Components/MainButton";
import SecondaryButton from "../../Components/SecondaryButton";
import CheckoutStepper from "../../Components/CheckoutStepper";
const Cart = () => {
  return (
    <section className=" min-h-screen bg-(--color-background)">
      <div className="p-6 lg:px-[10%]  flex flex-col gap-4">
        <CheckoutStepper currentStep={1} />
        <div className="flex gap-2 ">
          <h3 className=" text-2xl md:text-3xl font-bold">Shopping Cart</h3>
          <span className=" self-end">(4 items)</span>
        </div>

        <div className="w-full  flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[75%] bg-white shadow-sm rounded-2xl p-5">
            <div className="flex gap-5 border-b border-(--color-border) pb-4">
              <img
                src="/hero-image-1.jpg"
                alt="Product"
                className="h-22 w-20 md:h-28 md:w-28 object-cover rounded-xl"
              />

              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start ">
                  <div className="flex flex-col">
                    <span className="font-semibold text-wrap text-sm md:text-lg">
                      Classic White Sneakers
                    </span>
                    <span className="text-xs text-gray-500">US 10 · White</span>
                  </div>
                  <div className="font-semibold text-sm md:text-lg">
                    $129.00
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 flex-wrap">
                  <div className="flex items-center  border border-(--color-border) rounded-lg  ">
                    <button className="px-3 py-1  border-r border-(--color-border)">
                      -
                    </button>
                    <span className="px-3 py-1  border-r border-(--color-border)">
                      6
                    </span>
                    <button className="px-3 py-1  rounded-lg">+</button>
                  </div>

                  <button className="text-red-500 text-sm flex items-center gap-1">
                    <FaTrashAlt />
                    <span className="hidden md:block">Remove</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-5 border-b  border-(--color-border) py-4">
              <img
                src="/hero-image-1.jpg"
                alt="Product"
                className="h-22 w-20 md:h-28 md:w-28 object-cover rounded-xl"
              />

              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start ">
                  <div className="flex flex-col">
                    <span className="font-semibold text-wrap text-sm md:text-lg">
                      Classic White Sneakers
                    </span>
                    <span className="text-xs text-gray-500">US 10 · White</span>
                  </div>
                  <div className="font-semibold text-sm md:text-lg">
                    $129.00
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 flex-wrap">
                  <div className="flex items-center  border border-(--color-border) rounded-lg  ">
                    <button className="px-3 py-1  border-r border-(--color-border)">
                      -
                    </button>
                    <span className="px-3 py-1  border-r border-(--color-border)">
                      6
                    </span>
                    <button className="px-3 py-1  rounded-lg">+</button>
                  </div>

                  <button className="text-red-500 text-sm flex items-center gap-1">
                    <FaTrashAlt />
                    <span className="hidden md:block">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="  w-full lg:w-[25%] bg-white  shadow-sm rounded-2xl p-5 flex flex-col gap-3 ">
            <h2 className="text-center font-semibold text-lg">Order Summary</h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Subtotal (9 items)</span>
                <span className="text-sm">$10000</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Shipping</span>
                <span className="text-sm text-lime-700">Free</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Discount</span>
                <span className="text-sm text-lime-700">-$25.00</span>
              </div>
            </div>

            <div className="border border-(--color-border)"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total</span>
              <span className="text-lg md:text-2xl font-semibold">$250.00</span>
            </div>

            <MainButton name="Checkout" />

            <SecondaryButton name="Continue Shopping" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
