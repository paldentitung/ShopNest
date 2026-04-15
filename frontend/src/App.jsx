import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminLayout from "./Layouts/AdminLayout";
import AboutPage from "./Pages/User/AboutPage";
import Home from "./Pages/User/Home";
import UserLayout from "./Layouts/UserLayout";
import ProductPage from "./Pages/User/ProductPage";
import Cart from "./Pages/User/Cart";
import ContactPage from "./Pages/User/ContactPage";
import Profile from "./Pages/User/Profile";
import ProductManagement from "./Pages/Admin/ProductManagement";
import OrderManagement from "./Pages/Admin/OrderManagement";
import AdminProfile from "./Pages/Admin/AdminProfile";
import UserManagement from "./Pages/Admin/UserManagement";
import Shipping from "./Pages/User/Shipping";
import Payment from "./Pages/User/Payment";
import Review from "./Pages/User/Review";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import ProductDetails from "./Pages/User/ProductDetails";
import PageNotFound from "./Components/pages/PageNotFound";
import CheckOutLayout from "./Layouts/CheckoutLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/layout/ProtectedRoute";
import ContactManagement from "./Pages/Admin/ContactManagement";
import ScrollToTop from "./Components/layout/ScrollToTop";
import { useState, useEffect } from "react";
import SplashScreen from "./Components/ui/SplashScreen";
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#f9fafb",
            fontSize: "13px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "360px",
          },
          success: {
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              border: "1px solid rgba(52,211,153,0.3)",
            },
            iconTheme: {
              primary: "#34d399",
              secondary: "#1f2937",
            },
          },
          error: {
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              border: "1px solid rgba(248,113,113,0.3)",
            },
            iconTheme: {
              primary: "#f87171",
              secondary: "#1f2937",
            },
          },
          loading: {
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              border: "1px solid rgba(251,191,36,0.3)",
            },
            iconTheme: {
              primary: "#fbbf24",
              secondary: "#1f2937",
            },
          },
        }}
      />
      <ScrollToTop />

      <Routes>
        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

        {/* Admin routes (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="productmanagement" element={<ProductManagement />} />
          <Route path="ordermanagement" element={<OrderManagement />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="contactmanagement" element={<ContactManagement />} />

          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Public user routes (wrapped in UserLayout) */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Protected user routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="productdetails/:slug" element={<ProductDetails />} />
          <Route path="review" element={<Review />} />
        </Route>

        {/* Protected checkout routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CheckOutLayout>
                <Cart />
              </CheckOutLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CheckOutLayout>
                <Shipping />
              </CheckOutLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CheckOutLayout>
                <Payment />
              </CheckOutLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CheckOutLayout>
                <Review />
              </CheckOutLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
