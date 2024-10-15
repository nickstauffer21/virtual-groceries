import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeServer } from "./server";

import "./index.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Groceries from "./pages/Groceries/Groceries";
import Profile from "./pages/Profile/Profile";
import GroceryDetail from "./pages/Groceries/GroceryDetail";
import CartPage from "./pages/Cart/Cart";
import CartProvider from "./pages/Cart/CartProvider";
import AuthRequired from "./components/AuthRequired";
import Login from "./pages/Profile/Login";
import LoggedOut from "./pages/Profile/LoggedOut";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Groceries />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="groceries/:id" element={<GroceryDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="login" element={<Login />} />
            <Route element={<AuthRequired />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="logged-out" element={<LoggedOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
