import React from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "white",
  };

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("loggedin");
    navigate("/logged-out");
  }

  return (
    <header>
      <Link className="site-title" to="/">
        Virtual Groceries
      </Link>
      <nav>
        <NavLink
          to="/groceries"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Groceries
        </NavLink>
        <NavLink
          to="/cart"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Cart
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Profile
        </NavLink>
        <NavLink to="login" className="login-link">
          Login
        </NavLink>
        <button onClick={logOut}>Log Out</button>
      </nav>
    </header>
  );
}
