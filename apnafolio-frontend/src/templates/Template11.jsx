import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import dummyResume from "../constants/dummyResume";
import "./Template11.css";

export default function Template11({ data }) {
  const d = data || dummyResume; // 🔒 SAFE fallback
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const sections = [
    "hero","about","skills","projects",
    "education","experience","certifications",
    "resume","contact"
  ];

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  // 🔥 Cloudinary resume force download
  const resumeDownload = (url) => `${url}?fl_attachment`;

  return (
    <div className={`t9-container ${theme}`}>
      <Helmet>
        <title>{d.name || "ApnaFolio"} | {d.role || "Portfolio"}</title>
        <meta name="description" content={d.summary || "Personal portfolio on ApnaFolio"} />
        <meta property="og:title" content={`${d.name} | ${d.role}`} />
        <meta property="og:description" content={d.summary} />
        <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
      </Helmet>

      {/* Navbar */}
      <header className="t9-navbar">
        <div className="nav-logo">{d.name || "ApnaFolio"}</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={menuOpen ? "show" : ""}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="t9-hero">
        <motion.img
          src={d.contact?.photo || "/default-avatar.png"}
          alt={d.name}
          className="t9-avatar"
          animate={{ rotateY: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.h1 className="t9-name">{d.name}</motion.h1>
        <motion.h2 className="t9-role">{d.role}</motion.h2>
        <p className="t9-summary">{d.summary}</p>
      </section>

      {/* About */}
      <section id="about" className="t9-section">
        <h3>About Me</h3>
        <p>{d.summary}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="t9-section">
        <h3>Skills</h3>
        {subcats.map((sc) => {
          const arr = d[sc.key] || [];
          if (!arr.length) return null;
          return (
            <div key={sc.key} className="skills-subcat">
              <h4>{sc.title}</h4>
              <div className="t9-skill-grid">
                {arr.map((s, i) => {
                  const safe = String(s).toLowerCase().replace(/\s|\+|\.|#/g,"_");
                  const icon = `/icons/${safe}/${safe}-original.svg`;
                  return (
                    <motion.div key={i} className="t9-skill" whileHover={{ scale: 1.08 }}>
                      <img src={icon} alt={s} onError={(e)=>e.currentTarget.src="/icons/default.png"} />
                      <span>{s}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Projects */}
      <section id="projects" className="t9-section">
        <h3>Projects</h3>
        <div className="t9-projects">
          {(d.projects || []).map((p, i) => (
            <motion.div key={i} className="t9-project-card" whileHover={{ y: -10 }}>
              {p.image && <img src={p.image} alt={p.title} />}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="t9-links">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                {p.document && <a href={p.document} target="_blank" rel="noreferrer">View Doc</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="t9-section">
        <h3>Education</h3>
        {(d.education || []).map((ed, i) => (
          <div key={i} className="t9-card">
            <h4>{ed.degree}</h4>
            <p>{ed.school} — {ed.year}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      {!!(d.experience || []).length && (
        <section id="experience" className="t9-section">
          <h3>Experience</h3>
          {d.experience.map((ex, i) => (
            <div key={i} className="t9-card">
              <h4>{ex.title}</h4>
              <p>{ex.company} — {ex.duration}</p>
              {ex.document && (
                <a href={ex.document} target="_blank" rel="noreferrer">
                  View Proof
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {!!(d.certifications || []).length && (
        <section id="certifications" className="t9-section">
          <h3>Certifications</h3>
          {d.certifications.map((c, i) => (
            <div key={i} className="t9-card">
              <p>{c.name}</p>
              {c.document && (
                <a href={c.document} target="_blank" rel="noreferrer">
                  View
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Resume */}
      <section id="resume" className="t9-section">
        <h3>Resume</h3>
        {d.resumeFile ? (
          <a
            href={resumeDownload(d.resumeFile)}
            target="_blank"
            rel="noreferrer"
            className="t9-btn"
          >
            Download Resume
          </a>
        ) : <p>No resume uploaded.</p>}
      </section>

      {/* Contact */}
      <section id="contact" className="t9-section">
        <h3>Contact</h3>
        <p>Email: {d.contact?.email}</p>
        <p>Phone: {d.contact?.phone}</p>
        <p>Location: {d.contact?.location}</p>
      </section>

      <footer className="t9-footer">
        © {new Date().getFullYear()} {d.name} • Built with ApnaFolio
      </footer>
    </div>
  );
}
