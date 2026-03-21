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
import PageNotFound from "./Components/PageNotFound";
import CheckOutLayout from "./Layouts/CheckoutLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import ContactManagement from "./Pages/Admin/ContactManagement";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "bottom-right",
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "12px",
          },
          success: { style: { background: "green", color: "#fff" } },
          error: { style: { background: "red", color: "#fff" } },
          loading: { style: { background: "blue", color: "#fff" } },
        }}
      />

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
