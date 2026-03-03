import React from "react";
import SecondaryButton from "../../Components/SecondaryButton";
import MainButton from "../../Components/MainButton";
import CheckoutStepper from "../../Components/CheckoutStepper";
const Shipping = () => {
  return (
    <section className="bg-(--color-background) min-h-screen w-full p-6 md:p-10">
      <CheckoutStepper currentStep={2} />
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10   ">
        <div className="flex flex-col gap-6 w-full lg:w-[70%]">
          <div className="bg-(--color-surface) p-5 rounded-md shadow-md ">
            <div className="text-lg font-semibold mb-4">Shipping Address</div>

            <form className="w-full flex flex-col space-y-4">
              {/* Full Name */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="fullname" className="text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  className="p-3 border border-gray-300 rounded-md outline-none
                   transition-all duration-200 ease-in-out
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   placeholder:text-gray-400"
                />
              </div>

              {/* Phone */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="98XXXXXXXX"
                  className="p-3 border border-gray-300 rounded-md outline-none
                   transition-all duration-200 ease-in-out
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   placeholder:text-gray-400"
                />
              </div>

              {/* Address 1 */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="address1" className="text-sm text-gray-600">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  placeholder="Street name, house no"
                  className="p-3 border border-gray-300 rounded-md outline-none
                   transition-all duration-200 ease-in-out
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   placeholder:text-gray-400"
                />
              </div>

              {/* Address 2 */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="address2" className="text-sm text-gray-600">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  placeholder="Apartment, suite, etc"
                  className="p-3 border border-gray-300 rounded-md outline-none
                   transition-all duration-200 ease-in-out
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   placeholder:text-gray-400"
                />
              </div>

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative flex flex-col gap-1">
                  <label htmlFor="city" className="text-sm text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Kathmandu"
                    className="p-3 border border-gray-300 rounded-md outline-none
                     transition-all duration-200 ease-in-out
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     placeholder:text-gray-400"
                  />
                </div>

                <div className="relative flex flex-col gap-1">
                  <label htmlFor="state" className="text-sm text-gray-600">
                    State / Province
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="p-3 border border-gray-300 rounded-md outline-none
                     transition-all duration-200 ease-in-out
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select…</option>
                    <option>Nepal</option>
                    <option>California</option>
                    <option>New York</option>
                  </select>
                </div>

                <div className="relative flex flex-col gap-1">
                  <label htmlFor="zip" className="text-sm text-gray-600">
                    ZIP / Postal
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder="44600"
                    className="p-3 border border-gray-300 rounded-md outline-none
                     transition-all duration-200 ease-in-out
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="country" className="text-sm text-gray-600">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="p-3 border border-gray-300 rounded-md outline-none
                   transition-all duration-200 ease-in-out
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select country…</option>
                  <option>Nepal</option>
                  <option>United States</option>
                  <option>India</option>
                </select>
              </div>
            </form>
          </div>
          <div className="bg-(--color-surface) p-5 rounded-md shadow-lg flex flex-col space-y-5">
            <div className="text-lg font-semibold mb-4">Shipping Method</div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-4 border border-gray-300 p-3 rounded-md shadow-xs">
                <div>
                  <img src="" alt="" className="w-10 h-10 border" />
                </div>
                <div className=" flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm ">
                      Standard Shipping
                    </span>
                    <p className="text-xs text-gray-400">
                      Arrives in 5–7 business days
                    </p>
                  </div>
                  <div className="text-lime-700  md:text-lg">Free</div>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-gray-300 p-3 rounded-md  shadow-xs">
                <div>
                  <img src="" alt="" className="w-10 h-10 border" />
                </div>
                <div className=" flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm ">
                      Express Shipping
                    </span>
                    <p className="text-xs text-gray-400">
                      Arrives in 2–3 business days
                    </p>
                  </div>
                  <div className="font-semibold  md:text-lg">$9.99</div>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-gray-300 p-3 rounded-md shadow-xs">
                <div>
                  <img src="" alt="" className="w-10 h-10 border" />
                </div>
                <div className=" flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm ">
                      Overnight Delivery
                    </span>
                    <p className="text-xs text-gray-400">
                      Order by 2 PM for next-day arrival
                    </p>
                  </div>
                  <div className="font-semibold  md:text-lg">$24.99</div>
                </div>
              </div>
            </div>
          </div>
          <MainButton name="Continue to Payment" />
        </div>

        <div className="  w-full lg:w-[30%] bg-white  shadow-lg rounded-2xl p-5 flex flex-col gap-3 h-100 sticky top-10 z-30 ">
          <h2 className="text-center font-semibold text-lg">Order Summary</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2  p-1 rounded-md  shadow-xs">
              <div>
                <img src="" alt="" className="w-10 h-10 border" />
              </div>
              <div className=" flex-1 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm ">
                    Air Max Sneakers
                  </span>
                  <p className="text-xs text-gray-400">Size 10 · White</p>
                </div>
                <div className="font-semibold   text-sm">$199.99</div>
              </div>
            </div>

            <div className="flex items-center gap-2  p-1 rounded-md  shadow-xs">
              <div>
                <img src="" alt="" className="w-10 h-10 border" />
              </div>
              <div className=" flex-1 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm ">
                    Air Max Sneakers
                  </span>
                  <p className="text-xs text-gray-400">Size 10 · White</p>
                </div>
                <div className="font-semibold   text-sm">$199.99</div>
              </div>
            </div>

            <div className="flex items-center gap-2  p-1 rounded-md  shadow-xs">
              <div>
                <img src="" alt="" className="w-10 h-10 border" />
              </div>
              <div className=" flex-1 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm ">
                    Air Max Sneakers
                  </span>
                  <p className="text-xs text-gray-400">Size 10 · White</p>
                </div>
                <div className="font-semibold   text-sm">$199.99</div>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
};

export default Shipping;
