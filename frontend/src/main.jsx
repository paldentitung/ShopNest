import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { ModalProvider } from "./Context/ModalContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>,
);
