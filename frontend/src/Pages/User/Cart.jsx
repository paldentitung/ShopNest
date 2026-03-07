import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import MainButton from "../../Components/MainButton";
import SecondaryButton from "../../Components/SecondaryButton";
import CheckoutStepper from "../../Components/CheckoutStepper";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import BackButton from "../../Components/BackButton";
const Cart = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    tax,
    total,
    cartLength,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    MAX_QTY,
    MIN_QTY,
  } = useCart();

  const navigate = useNavigate();

  return (
    <section className=" min-h-screen bg-(--color-background)">
      {cartItems.length > 0 ? (
        <div className="p-6 lg:px-[10%]  flex flex-col gap-4">
          <div className="flex items-center">
            <BackButton />
            <CheckoutStepper currentStep={1} />
          </div>
          <div className="flex gap-2 ">
            <h3 className=" text-2xl md:text-3xl font-bold">Shopping Cart</h3>
            <span className=" self-end">({cartLength} items)</span>
          </div>

          <div className="w-full  flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[75%]  bg-white shadow-sm rounded-2xl p-5">
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
                          className={`px-3 py-1  border-r border-(--color-border) ${item.quantity <= MIN_QTY ? "cursor-not-allowed" : ""}  `}
                          disabled={item.quantity <= MIN_QTY}
                        >
                          -
                        </button>
                        <span className="px-3 py-1  border-r border-(--color-border)">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className={`px-3 py-1  rounded-lg ${item.quantity >= MAX_QTY ? "cursor-not-allowed" : ""} `}
                          disabled={item.quantity >= MAX_QTY}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeItem(item._id);
                          toast.success("Product Remove from cart");
                        }}
                        className="text-red-500 text-sm flex items-center gap-1 cursor-pointer"
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
              <h2 className="text-center font-semibold text-lg">
                Order Summary
              </h2>

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
                  ${total.toFixed(2)}
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
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="relative text-center max-w-sm w-full bg-stone-50 border border-stone-200 rounded-sm shadow-md px-10 py-14 overflow-hidden">
            <div
              className="mx-auto mb-7 w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center relative animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-300 border-2 border-stone-50 flex items-center justify-center text-[10px] font-bold text-amber-900">
                0
              </span>
              <FaShoppingBag
                className="w-8 h-8 text-amber-700"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-2 tracking-tight">
              Your cart is empty
            </h3>

            <p className="text-sm text-stone-400 font-light leading-relaxed mb-7">
              Looks like you haven't added anything yet.
              <br />
              Find something you'll love.
            </p>

            <div className="w-10 h-px bg-stone-300 mx-auto mb-7" />

            <MainButton
              name="View Products"
              onClick={() => navigate("/user/products")}
            />

            <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-stone-300">
              ∅ empty
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
