import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./Login.css";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    loginUser(loginFormData)
      .then((data) => {
        console.log(data);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed", error);
        setStatus("idle");
      });
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Already logged in!</h1>
      </div>
    );
  }

  return (
    <div className="login-form-container">
      <h1>Sign in to your account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="example@email.com"
          type="email"
          value={loginFormData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={loginFormData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
