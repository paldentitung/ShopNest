import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { ModalProvider } from "./Context/ModalContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { CheckoutProvider } from "./Context/CheckoutContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AdminProvider } from "./Context/AdminContext.jsx";
import { SideBarProvider } from "./Context/SideBarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <CheckoutProvider>
              <SearchProvider>
                <ModalProvider>
                  <SideBarProvider>
                    <App />
                  </SideBarProvider>
                </ModalProvider>
              </SearchProvider>
            </CheckoutProvider>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
