import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./Template10.css";

export default function Template10({ data }) {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  const sections = [
    "hero","about","skills","projects","education","experience","certifications","resume","contact"
  ];

  return (
    <div className={`t1-container ${theme}`}>
      <Helmet>
  <title>{data?.name || "ApnaFolio"} | {data?.role || "Portfolio"}</title>
  <meta name="description" content={data?.summary || "Personal portfolio on ApnaFolio"} />
  <meta property="og:title" content={`${data?.name} | ${data?.role}`} />
  <meta property="og:description" content={data?.summary} />
  <meta property="og:image" content={data?.contact?.photo || "/default-avatar.png"} />
</Helmet>

      {/* Navbar */}
      <header className="navbar solid">
        <div className="nav-logo">{data?.name || "ApnaFolio"}</div>

        {/* Hamburger */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={menuOpen ? "show" : ""}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="t1-hero">
        <motion.img
          src={data?.contact?.photo || "/default-avatar.png"}
          alt={data?.name}
          className="t1-avatar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
        <motion.h1
          className="gradient-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {data?.name || "Your Name"}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {data?.role || "Your Role"}
        </motion.h2>
        <p>{data?.summary || "Short tagline/summary goes here."}</p>
      </section>

      {/* About */}
      <motion.section
        id="about"
        className="t1-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>About Me</h3>
        <p>{data?.summary || "Write about yourself…"}</p>
      </motion.section>

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
      <motion.section
        id="projects"
        className="t1-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>Projects</h3>
        <div className="t1-projects">
          {(data?.projects || []).map((p, i) => (
            <motion.div
              key={i}
              className="t1-project-card"
              whileHover={{ scale: 1.02 }}
            >
              {p.video ? (
                <video src={p.video} controls className="t1-project-media" />
              ) : p.image ? (
                <img src={p.image} alt={p.title} className="t1-project-media" />
              ) : null}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="t1-tags">
                {(p.tags || []).map((t, idx) => (
                  <span key={idx} className="t1-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="t1-links">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {p.document && <a href={p.document} download>Download Doc</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        id="education"
        className="t1-section"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3>Education</h3>
        {(data?.education || []).map((ed, i) => (
          <div key={i} className="t1-card">
            <h4>{ed.degree}</h4>
            <p>
              {ed.school} — {ed.year}
            </p>
          </div>
        ))}
      </motion.section>

      {/* Experience */}
      {!!(data?.experience || []).length && (
        <motion.section
          id="experience"
          className="t1-section"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3>Experience</h3>
          {data.experience.map((ex, i) => (
            <div key={i} className="t1-card">
              <h4>{ex.title}</h4>
              <p>
                {ex.company} — {ex.duration}
              </p>
              {ex.document && <a href={ex.document} download>Download Doc</a>}
            </div>
          ))}
        </motion.section>
      )}

      {/* Certifications */}
      {!!(data?.certifications || []).length && (
        <motion.section
          id="certifications"
          className="t1-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Certifications</h3>
          {data.certifications.map((c, i) => (
            <div key={i} className="t1-card">
              <p>{c.name}</p>
              {c.document && <a href={c.document} download>Download</a>}
            </div>
          ))}
        </motion.section>
      )}

      {/* Resume */}
      <motion.section
        id="resume"
        className="t1-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3>Resume</h3>
        {data?.resumeFile ? (
          <a href={data.resumeFile} download className="t1-btn">
            Download Resume
          </a>
        ) : (
          <p>No resume uploaded.</p>
        )}
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        className="t1-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>Contact</h3>
        <form className="t1-contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Message" required />
          <button type="submit">Send Message</button>
        </form>
        <div className="t1-contact-info">
          <p>Email: {data?.contact?.email}</p>
          <p>Phone: {data?.contact?.phone}</p>
          <p>Location: {data?.contact?.location}</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="t1-footer">
        © {new Date().getFullYear()} {data?.name || "Your Name"} • Built with
        ApnaFolio
      </footer>
    </div>
  );
}
