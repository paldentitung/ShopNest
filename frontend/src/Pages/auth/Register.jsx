import React from "react";
import MainButton from "../../Components/MainButton";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { register } from "../../Services/authApi";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register({ username, email, password });
    console.log(res);

    if (res.message === "User created") {
      navigate("/login/user");
    } else {
      alert(res.message || "Registration failed");
    }
  };
  return (
    <section className="min-h-screen bg-(--color-background) flex justify-center items-center">
      {/* wrapper */}
      <div className="bg-white w-full max-w-5xl mx-auto h-full max-h-200 rounded-2xl shadow p-8 flex gap-8 overflow-hidden">
        {/* Left side illustration */}
        <div className="hidden md:flex flex-1 h-1/2 flex-col gap-10 overflow-hidden">
          <div className="font-bold text-lg text-center">
            Register now to explore the latest collections and enjoy exclusive
            offers.
          </div>
          <div className="h-full">
            <img
              src="/register.svg"
              alt="Register Illustration"
              className="h-full"
            />
          </div>
        </div>

        <div className="hidden md:block border border-gray-100"></div>

        {/* Right side form */}
        <div className="flex-1">
          <form
            onSubmit={handleRegister}
            className="flex justify-center items-center flex-col space-y-3"
          >
            {/* Heading */}
            <div className="text-center flex justify-center items-center flex-col gap-2">
              <h2 className="font-semibold">ShopNest</h2>
              <div>
                <span className="text-lg md:text-2xl font-bold">
                  Create an Account
                </span>
                <p>Please fill in your details to register</p>
              </div>
            </div>

            {/* Username */}
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white"
                required
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white"
                required
              />
            </div>

            {/* Password */}
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full max-w-sm px-6 py-3 bg-(--color-foreground) text-white rounded-md shadow-md opacity-90 hover:opacity-100 transition-all duration-300 hover:cursor-pointer"
            >
              Register
            </button>

            {/* Or login with */}
            <div className="flex items-center text-[14px] text-gray-500 gap-2 my-4 w-full max-w-sm">
              <span className="flex-1 border-b border-gray-400"></span>
              <span className="px-2">Or Register with</span>
              <span className="flex-1 border-b border-gray-400"></span>
            </div>

            {/* Link to login */}
            <div className="text-sm mt-8 flex items-center gap-3">
              Already have an account?
              <Link to="/login/user">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
