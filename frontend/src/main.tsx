import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
