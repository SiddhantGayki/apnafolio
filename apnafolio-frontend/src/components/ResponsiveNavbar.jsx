import React, { useState, useEffect } from "react";
import "./ResponsiveNavbar.css";

export default function ResponsiveNavbar({ sections = [], name = "ApnaFolio", theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on resize > mobile
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`nav-header ${scrolled ? "scrolled" : ""} ${theme || ""}`}>
      <div className="nav-left">
        <div className="nav-logo">{name}</div>
      </div>

      <button
        className="nav-hamburger"
        aria-label="Toggle menu"
        onClick={() => setOpen((s) => !s)}
      >
        ☰
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {sections.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </nav>

      <button
        className="nav-theme"
        onClick={() => setTheme && setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
