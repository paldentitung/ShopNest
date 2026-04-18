import React, { useContext } from "react";
import MainButton from "../../Components/common/MainButton";
import CheckoutStepper from "../../Components/checkout/CheckoutStepper";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { CheckoutContext } from "../../Context/CheckoutContext";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Shipping = () => {
  const { cartItems, total, cartLength } = useCart();

  const navigate = useNavigate();
  const {
    shippingMethod,
    shippingCost,
    totalWithShipping,
    updateShipping,
    shippingFormData,
    handleChange,
  } = useContext(CheckoutContext);

  const shippingData = [
    {
      method: "standard",
      label: "Standard Shipping",
      price: 0,
      desc: "Arrives in 5–7 business days",
      icon: "https://cdn-icons-png.flaticon.com/512/1048/1048325.png",
    },
    {
      method: "express",
      label: "Express Shipping",
      price: 9.99,
      desc: "Arrives in 2–3 business days",
      icon: "https://cdn-icons-png.flaticon.com/512/3126/3126647.png",
    },
    {
      method: "overnight",
      label: "Overnight Delivery",
      price: 24.99,
      desc: "Order by 2 PM for next-day arrival",
      icon: "https://cdn-icons-png.flaticon.com/512/3081/3081648.png",
    },
  ];

  const handleContinue = () => {
    const { fullname, phone, address1, city, state, zip, country } =
      shippingFormData;

    if (!fullname || !phone || !address1 || !city || !country) {
      alert("Please fill in all required fields before continuing.");
      return;
    }

    navigate("/payment");
  };
  return (
    <section className="bg-(--color-background) min-h-screen w-full p-6 md:p-10">
      <CheckoutStepper currentStep={2} />

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-6 w-full lg:w-[70%]">
          <div className="bg-(--color-surface) p-5 rounded-md shadow-md">
            <div className="text-lg font-semibold mb-4">Shipping Address</div>
            <form className="w-full flex flex-col space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="fullname" className="text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  required
                  value={shippingFormData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  required
                  name="phone"
                  value={shippingFormData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="address1" className="text-sm text-gray-600">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  required
                  name="address1"
                  value={shippingFormData.address1}
                  onChange={handleChange}
                  placeholder="Street name, house no"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address 2 */}
              <div className="flex flex-col gap-1">
                <label htmlFor="address2" className="text-sm text-gray-600">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={shippingFormData.address2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={shippingFormData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="state"
                  value={shippingFormData.state}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select…</option>
                  <option>Nepal</option>
                  <option>California</option>
                  <option>New York</option>
                </select>
                <input
                  type="text"
                  name="zip"
                  value={shippingFormData.zip}
                  onChange={handleChange}
                  placeholder="ZIP"
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Country */}
              <select
                name="country"
                value={shippingFormData.country}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Country…</option>
                <option>Nepal</option>
                <option>United States</option>
                <option>India</option>
              </select>
            </form>
          </div>

          {/* Shipping Method */}
          <div className="bg-(--color-surface) p-5 rounded-md shadow-lg flex flex-col space-y-5">
            <div className="text-lg font-semibold mb-4">Shipping Method</div>
            <div className="flex flex-col space-y-3">
              {shippingData.map(({ method, label, price, desc, icon }) => (
                <div
                  key={method}
                  onClick={() => updateShipping(method)}
                  className={`flex items-center gap-4 border border-gray-300 p-3 rounded-md cursor-pointer ${shippingMethod === method ? "bg-orange-100" : ""}`}
                >
                  <img
                    src={icon}
                    alt={label}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm">{label}</span>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                    <div className="font-semibold md:text-lg">
                      {price === 0 ? "Free" : `$${price}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MainButton name="Continue to Payment" onClick={handleContinue} />
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-3 h-100 overflow-y-scroll sticky top-10 z-30">
          <h2 className="text-center font-semibold text-lg">Order Summary</h2>

          <div className="flex flex-col gap-3">
            {cartItems.map((item, index) => (
              <div
                key={item.product._id || index}
                className="flex items-center gap-2 p-1 rounded-md shadow-xs"
              >
                <img
                  src={`${VITE_SERVER_URL}/${item.product.images[0]}`}
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

export default Shipping;
