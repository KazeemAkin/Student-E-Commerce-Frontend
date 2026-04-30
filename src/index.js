import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // core css
import "primeicons/primeicons.css";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Root from "./screens/Root/Root";
import { AuthProvider } from "./hooks/UseAuth";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
);
