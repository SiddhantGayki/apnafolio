// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { setAuth } from "../../utils/auth";
import GoogleButton from "../../components/auth/GoogleButton";
// import GoogleOneTap from "../../components/auth/GoogleOneTap";
import "../../styles/AuthPages.css";
import Lottie from "lottie-react";
import techAnimation from "../../assets/tech-animation.json";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (msg) setMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      if (!user?.isVerified) {
        setMsg("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      // ✅ Store auth (single source of truth)
      setAuth({ token, user });

      // ✅ Redirect flow (order matters)
      if (user.isAdmin) {
        navigate("/admin", { replace: true });
        return;
      }

      if (user.paid) {
        navigate("/dashboard", { replace: true });
        return;
      }

      navigate("/form", { replace: true });
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-glow" />
      {/* <GoogleOneTap /> */}
      <Link to="/">
        <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
      </Link>

      <div className="auth-box">
        {/* LEFT */}
        <div className="auth-left">
          <h2>Welcome Back</h2>
          <p className="tagline">Log in to manage your digital presence.</p>

          <form onSubmit={handleLogin} className="auth-form">
            {msg && <p className="error">{msg}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="auth-main-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <GoogleButton />

            <p style={{ marginTop: "18px", fontSize: "0.9rem" }}>
              New here?{" "}
              <Link to="/signup" className="register-link">
                Create Account
              </Link>
            </p>

            <p style={{ fontSize: "0.9rem" }}>
              <Link to="/forgot-password" className="register-link">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <Lottie
            animationData={techAnimation}
            loop
            style={{ width: "80%" }}
          />
        </div>
        
      </div>
      
    </div>
  );
}