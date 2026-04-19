import React from "react";
import MainButton from "../../Components/common/MainButton";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/authApi";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ email, password });

      const { token, user } = res.data;
      loginUser(token, user);

      if (user.role === "admin") {
        toast.success(`Welcome back, Admin ${user.username}!`);
        navigate("/admin/");
      } else {
        toast.success(
          `Welcome back, ${user.username}! You have logged in successfully.`,
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-(--color-background) flex justify-center items-center">
      {/* wrapper */}
      <div className="bg-white w-full max-w-5xl mx-auto h-full max-h-140 rounded-2xl shadow p-8 flex gap-8 overflow-hidden">
        <div className="hidden md:flex flex-1 h-1/2 flex-col gap-10 overflow-hidden">
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
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
            <div className="w-full max-w-sm flex flex-col gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="border border-(--color-border) p-2 outline-0 rounded-md shadow transition-all duration-300 focus:ring-2 focus:ring-(--color-foreground) focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-2"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={() => navigate("/forgot-password")}
              type="button"
              disabled={loading}
              className="text-[13px] ml-auto md:pr-10 disabled:opacity-50"
            >
              Forgot password?
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-sm px-6 py-3 bg-(--color-foreground) text-white rounded-md shadow-md opacity-90 hover:opacity-100 transition-all duration-300 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

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
