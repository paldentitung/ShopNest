import { Routes, Route } from "react-router-dom";
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
import UserLogin from "./Pages/auth/UserLogin";
import AdminLogin from "./Pages/auth/AdminLogin";
import OrderManagement from "./Pages/Admin/OrderManagement";
import AdminProfile from "./Pages/Admin/AdminProfile";
import UserManagement from "./Pages/Admin/UserManagement";
import Shipping from "./Pages/User/Shipping";
import Payment from "./Pages/User/Payment";
const App = () => {
  return (
    <Routes>
      <Route path="/login/user" element={<UserLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />

      {/* admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="productmanagement" element={<ProductManagement />} />
        <Route path="ordermanagement" element={<OrderManagement />} />
        <Route path="usermanagement" element={<UserManagement />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* user */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} /> {/* /user */}
        <Route path="products" element={<ProductPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="Review" element={<Review />} />
      </Route>
    </Routes>
  );
};

export default App;
