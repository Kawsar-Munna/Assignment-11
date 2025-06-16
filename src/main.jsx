import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider"; // ✅ fixed here
import './index.css';
import ThemeProvider from './contexts/ThemeContext';
import { ChakraProvider } from "@chakra-ui/react";

import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />   
        </ThemeProvider>
      </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
