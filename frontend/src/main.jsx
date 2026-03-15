import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { ModalProvider } from "./Context/ModalContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { CheckoutProvider } from "./Context/CheckoutContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CheckoutProvider>
          <SearchProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SearchProvider>
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
