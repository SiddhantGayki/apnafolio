import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme; // apply globally
  };

  return (
    <header className="navbar">
      <div className="nav-logo">ApnaFolio</div>
      <nav>
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#experience">Experience</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
