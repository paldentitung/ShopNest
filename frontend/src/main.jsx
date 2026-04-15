import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.jsx";
import { CheckoutProvider } from "./Context/CheckoutContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AdminProvider } from "./Context/AdminContext.jsx";
import { AppProvider } from "./Context/AppContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <CheckoutProvider>
                <SearchProvider>
                  <App />
                </SearchProvider>
              </CheckoutProvider>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
