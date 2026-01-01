import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/IntroPage.css";
import logo from "../assets/logo.png";

export default function Navbar2() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo-wrap">
        <img src={logo} alt="ApnaFolio Logo" className="logo-img" />
      </Link>

      {/* DESKTOP MENU */}
      <div className="nav-menu desktop">
        <Link to="/" className="menu-link">Home</Link>
        <Link to="/explore" className="menu-link">Templates</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="register-btn">Get Started</Link>
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setOpen(false)}>Templates</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link
            to="/signup"
            className="mobile-cta"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
