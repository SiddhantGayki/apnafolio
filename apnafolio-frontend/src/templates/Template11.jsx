import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./Template11.css";

export default function Template11({ data }) {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const sections = [
    "hero","about","skills","projects","education","experience","certifications","resume","contact"
  ];

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  return (
    <div className={`t9-container ${theme}`}>
      <Helmet>
  <title>{data?.name || "ApnaFolio"} | {data?.role || "Portfolio"}</title>
  <meta name="description" content={data?.summary || "Personal portfolio on ApnaFolio"} />
  <meta property="og:title" content={`${data?.name} | ${data?.role}`} />
  <meta property="og:description" content={data?.summary} />
  <meta property="og:image" content={data?.contact?.photo || "/default-avatar.png"} />
</Helmet>

      {/* Navbar */}
      <header className="t9-navbar">
        <div className="nav-logo">{data?.name || "ApnaFolio"}</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={menuOpen ? "show" : ""}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="t9-hero">
        <motion.img
          src={data?.contact?.photo || "/default-avatar.png"}
          alt={data?.name}
          className="t9-avatar"
          animate={{ rotateY: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.h1 className="t9-name" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {data?.name || "Your Name"}
        </motion.h1>
        <motion.h2 className="t9-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {data?.role || "Your Role"}
        </motion.h2>
        <p className="t9-summary">{data?.summary || "Short tagline goes here."}</p>
      </section>

      {/* About */}
      <section id="about" className="t9-section">
        <h3>About Me</h3>
        <p>{data?.summary || "Write about yourself…"}</p>
      </section>

      {/* Skills */}
      <motion.section
        id="skills"
        className="t1-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3>Skills</h3>
        {subcats.map((sc) => {
          const arr = data?.[sc.key] || [];
          if (!arr.length) return null;
          return (
            <div key={sc.key} className="skills-subcat">
              <h4>{sc.title}</h4>
              <div className="t1-skill-grid">
                {arr.map((s, i) => {
                  const safeName = String(s)
                    .toLowerCase()
                    .replace(/\s|\+|\.|#/g, "_");
                  const iconPath = `/icons/${safeName}/${safeName}-original.svg`;
                  return (
                    <motion.div
                      key={i}
                      className="t1-skill"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      <img
                        src={iconPath}
                        alt={s}
                        className="t1-skill-icon"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/icons/default.png";
                        }}
                      />
                      <span>{s}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.section>

      {/* Projects */}
      <section id="projects" className="t9-section">
        <h3>Projects</h3>
        <div className="t9-projects">
          {(data?.projects || []).map((p, i) => (
            <motion.div key={i} className="t9-project-card" whileHover={{ y: -10, rotateX: 5 }}>
              {p.video ? (
                <video src={p.video} controls className="t9-project-media" />
              ) : p.image ? (
                <img src={p.image} alt={p.title} className="t9-project-media" />
              ) : null}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="t9-tags">
                {(p.tags || []).map((t, idx) => (
                  <span key={idx} className="t9-tag">{t}</span>
                ))}
              </div>
              <div className="t9-links">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                {p.document && <a href={p.document} download>Doc</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="t9-section">
        <h3>Education</h3>
        {(data?.education || []).map((ed, i) => (
          <div key={i} className="t9-card">
            <h4>{ed.degree}</h4>
            <p>{ed.school} — {ed.year}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      {!!(data?.experience || []).length && (
        <section id="experience" className="t9-section">
          <h3>Experience</h3>
          {data.experience.map((ex, i) => (
            <div key={i} className="t9-card">
              <h4>{ex.title}</h4>
              <p>{ex.company} — {ex.duration}</p>
              {ex.document && <a href={ex.document} download>Download</a>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {!!(data?.certifications || []).length && (
        <section id="certifications" className="t9-section">
          <h3>Certifications</h3>
          {data.certifications.map((c, i) => (
            <div key={i} className="t9-card">
              <p>{c.name}</p>
              {c.document && <a href={c.document} download>Download</a>}
            </div>
          ))}
        </section>
      )}

      {/* Resume */}
      <section id="resume" className="t9-section">
        <h3>Resume</h3>
        {data?.resumeFile ? (
          <a href={data.resumeFile} download className="t9-btn">Download Resume</a>
        ) : <p>No resume uploaded.</p>}
      </section>

      {/* Contact */}
      <section id="contact" className="t9-section">
        <h3>Contact</h3>
        <form className="t9-contact-form" onSubmit={(e)=>e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Message" required />
          <button type="submit">Send</button>
        </form>
        <div className="t9-contact-info">
          <p>Email: {data?.contact?.email}</p>
          <p>Phone: {data?.contact?.phone}</p>
          <p>Location: {data?.contact?.location}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="t9-footer">
        © {new Date().getFullYear()} {data?.name || "Your Name"} • Built with ApnaFolio
      </footer>
    </div>
  );
}
