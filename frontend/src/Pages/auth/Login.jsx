import React from "react";
import MainButton from "../../Components/MainButton";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      console.log(res);

      if (res.token) {
        localStorage.setItem("ShopNext-token", res.token); // save JWT

        // redirect based on role
        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/");
        }
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <section className="min-h-screen bg-(--color-background)  flex justify-center items-center">
      {/* wrapper */}
      <div className="bg-white w-full max-w-5xl mx-auto h-full max-h-140 rounded-2xl shadow p-8 flex gap-8  overflow-hidden ">
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
          <form
            onSubmit={handleLogin}
            className="flex justify-center items-center flex-col space-y-3"
          >
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
                onChange={(e) => setEmail(e.target.value)}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2  focus:ring-offset-white  "
                required
              />
            </div>
            <div className="w-full max-w-sm flex flex-col gap-1 ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2  focus:ring-offset-white  "
                required
              />
            </div>
            <button type="button" className="text-[13px] ml-auto md:pr-10">
              Forgot password?
            </button>
            <button
              type="submit"
              className=" w-full max-w-sm px-6 py-3 bg-(--color-foreground) text-white rounded-md shadow-md opacity-90 hover:opacity-100 transition-all duration-300 hover:cursor-pointer "
            >
              Login
            </button>

            <div className="flex items-center text-[14px] text-gray-500 gap-2 my-4 w-full max-w-sm">
              <span className="flex-1 border-b border-gray-400"></span>
              <span className="px-2">Or Login with</span>
              <span className="flex-1 border-b border-gray-400"></span>
            </div>

            <div className="text-sm mt-8 flex items-center gap-3">
              Don't have an account?
              <Link to="/register">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
