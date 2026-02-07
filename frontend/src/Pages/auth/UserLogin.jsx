import React from "react";
import MainButton from "../../Components/MainButton";
import { FaGoogle, FaFacebook } from "react-icons/fa";
const UserLogin = () => {
  return (
    <section className="min-h-screen bg-(--color-background)  flex justify-center items-center">
      {/* wrapper */}
      <div className="bg-white w-full max-w-5xl mx-auto h-full max-h-160 rounded-2xl shadow p-8 flex gap-8  overflow-hidden ">
        <div className=" hidden md:flex flex-1 h-1/2  flex-col gap-10 overflow-hidden  ">
          <div className="font-bold text-lg text-center">
            Log in to explore the latest collections and manage your orders.
          </div>
          <div className="h-1/3">
            <img src="../login.svg" alt="" className="" />
          </div>
        </div>
        <div className="hidden md:block border border-gray-100"></div>
        <div className="flex-1">
          <form className="flex justify-center items-center flex-col space-y-3">
            <div className="text-center flex justify-center items-center flex-col gap-2">
              <h2 className="font-semibold">ShopNest</h2>
              <div>
                <span className="text-lg md:text-2xl font-bold">
                  Welcome Back
                </span>
                <p>Please Login to your account</p>
              </div>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-1 ">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2  focus:ring-offset-white  "
                required
              />
            </div>
            <div className="w-full max-w-sm flex flex-col gap-1 ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2  focus:ring-offset-white  "
                required
              />
            </div>
            <button type="button" className="text-[13px] ml-auto md:pr-10">
              Forgot password?
            </button>
            <MainButton name="login" type="submit" />

            <div className="flex items-center text-[14px] text-gray-500 gap-2 my-4 w-full max-w-sm">
              <span className="flex-1 border-b border-gray-400"></span>
              <span className="px-2">Or Login with</span>
              <span className="flex-1 border-b border-gray-400"></span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-1 px-8 py-3 rounded-msm border border-(--color-border)"
              >
                <FaGoogle />
                Google
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-8 py-3 rounded-msm border border-(--color-border)"
              >
                <FaFacebook />
                Facebook
              </button>
            </div>
            <div className="text-sm mt-8 flex items-center gap-3">
              Don't have an account?
              <button type="button">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
