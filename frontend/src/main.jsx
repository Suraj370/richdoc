import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/Usercontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
    <Toaster />
  </UserProvider>
);
