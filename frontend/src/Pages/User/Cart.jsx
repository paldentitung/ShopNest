import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import MainButton from "../../Components/MainButton";
import SecondaryButton from "../../Components/SecondaryButton";
import CheckoutStepper from "../../Components/CheckoutStepper";
import { useEffect } from "react";
import { getCart } from "../../Services/cartApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useCart } from "../../Context/CartContext";
const Cart = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    tax,
    total,
    cartLength,
    removeItem,
    updateItemQuantity,
  } = useCart();

  const navigate = useNavigate();

  const increaseQuantity = (cartItemId) => {
    const item = cartItems.find((i) => i._id === cartItemId);
    if (item) updateItemQuantity(cartItemId, item.quantity + 1);
  };

  const decreaseQuantity = (cartItemId) => {
    const item = cartItems.find((i) => i._id === cartItemId);
    if (item && item.quantity > 1)
      updateItemQuantity(cartItemId, item.quantity - 1);
  };
  return (
    <section className=" min-h-screen bg-(--color-background)">
      <div className="p-6 lg:px-[10%]  flex flex-col gap-4">
        <CheckoutStepper currentStep={1} />
        <div className="flex gap-2 ">
          <h3 className=" text-2xl md:text-3xl font-bold">Shopping Cart</h3>
          <span className=" self-end">({cartLength} items)</span>
        </div>

        <div className="w-full  flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[75%] bg-white shadow-sm rounded-2xl p-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 border-b border-(--color-border) pb-4"
              >
                <img
                  src={`http://localhost:3000/${item.product.images[0]}`}
                  alt="Product"
                  className="h-22 w-20 md:h-28 md:w-28 object-contain rounded-xl"
                />

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start ">
                    <div className="flex flex-col">
                      <span className="font-semibold text-wrap text-sm md:text-lg">
                        {item.product.name}
                      </span>
                    </div>
                    <div className="font-semibold text-sm md:text-lg">
                      ${item.product.priceCents / 100}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 flex-wrap">
                    <div className="flex items-center  border border-(--color-border) rounded-lg  ">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-3 py-1  border-r border-(--color-border)"
                      >
                        -
                      </button>
                      <span className="px-3 py-1  border-r border-(--color-border)">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-3 py-1  rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <FaTrashAlt />
                      <span className="hidden md:block">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="  w-full lg:w-[25%] bg-white  shadow-sm rounded-2xl p-5 h-86 flex flex-col gap-3 sticky top-10  ">
            <h2 className="text-center font-semibold text-lg">Order Summary</h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Subtotal ({totalItems})</span>
                <span className="text-sm">{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Tax(14%)</span>
                <span className="text-sm ">+${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border border-(--color-border)"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total</span>
              <span className="text-lg md:text-2xl font-semibold">
                ${total}
              </span>
            </div>

            <MainButton name="Checkout" />

            <SecondaryButton
              name="Continue Shopping"
              onClick={() => navigate("/user/products")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
