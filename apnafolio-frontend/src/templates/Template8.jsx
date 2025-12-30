import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Template8.css";

export default function Template8({ data }) {
  const [theme, setTheme] = useState("light");
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    const handleScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  const sections = [
    "hero","about","skills","projects",
    "education","experience","certifications",
    "resume","contact"
  ];

  // 🔥 Resume download helper (Cloudinary safe)
  const downloadResume = (url) => `${url}?fl_attachment`;

  return (
    <div className={`t2-container ${theme}`}>
      <Helmet>
        <title>{data?.name || "ApnaFolio"} | {data?.role || "Portfolio"}</title>
        <meta name="description" content={data?.summary || "Personal portfolio on ApnaFolio"} />
        <meta property="og:title" content={`${data?.name} | ${data?.role}`} />
        <meta property="og:description" content={data?.summary} />
        <meta property="og:image" content={data?.contact?.photo || "/default-avatar.png"} />
      </Helmet>

      {/* Navbar */}
      <header className={`t2-navbar ${navSolid ? "solid" : "transparent"}`}>
        <div className="nav-logo">{data?.name || "ApnaFolio"}</div>

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

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="t2-hero">
        <div className="gradient-bg" />
        <motion.img
          src={data?.contact?.photo || "/default-avatar.png"}
          alt={data?.name}
          className="t2-avatar"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.h1 className="t2-name">{data?.name || "Your Name"}</motion.h1>
        <motion.h2 className="t2-role">{data?.role || "Your Role"}</motion.h2>
        <p className="t2-summary">{data?.summary || "Short tagline goes here."}</p>
      </section>

      {/* About */}
      <section id="about" className="t2-section alt">
        <h3>About Me</h3>
        <p>{data?.summary || "Write about yourself…"}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="t2-section">
        <h3>Skills</h3>
        {subcats.map((sc) => {
          const arr = data?.[sc.key] || [];
          if (!arr.length) return null;
          return (
            <div key={sc.key} className="skills-subcat">
              <h4>{sc.title}</h4>
              <div className="t2-skill-grid">
                {arr.map((s, i) => {
                  const safeName = String(s).toLowerCase().replace(/\s|\+|\.|#/g, "_");
                  const iconPath = `/icons/${safeName}/${safeName}-original.svg`;
                  return (
                    <motion.div key={i} className="t2-skill" whileHover={{ scale: 1.1 }}>
                      <img
                        src={iconPath}
                        alt={s}
                        onError={(e) => (e.currentTarget.src = "/icons/default.png")}
                      />
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
      <section id="projects" className="t2-section alt">
        <h3>Projects</h3>
        <div className="t2-projects">
          {(data?.projects || []).map((p, i) => (
            <motion.article key={i} className="t2-project-card" whileHover={{ y: -6 }}>
              {p.video ? (
                <video src={p.video} controls className="t2-project-media" />
              ) : p.image ? (
                <img src={p.image} alt={p.title} className="t2-project-media" />
              ) : null}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="t2-tags">
                {(p.tags || []).map((t, idx) => (
                  <span key={idx} className="t2-tag">{t}</span>
                ))}
              </div>
              <div className="t2-links">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                {p.document && (
                  <a href={p.document} target="_blank" rel="noreferrer">
                    View Doc
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="t2-section">
        <h3>Education</h3>
        {(data?.education || []).map((ed, i) => (
          <div key={i} className="t2-card">
            <h4>{ed.degree}</h4>
            <p>{ed.school} — {ed.year}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      {!!(data?.experience || []).length && (
        <section id="experience" className="t2-section alt">
          <h3>Experience</h3>
          {data.experience.map((ex, i) => (
            <div key={i} className="t2-card">
              <h4>{ex.title}</h4>
              <p>{ex.company} — {ex.duration}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {!!(data?.certifications || []).length && (
        <section id="certifications" className="t2-section">
          <h3>Certifications</h3>
          {data.certifications.map((c, i) => (
            <div key={i} className="t2-card">
              <p>{c.name}</p>
            </div>
          ))}
        </section>
      )}

      {/* Resume */}
      <section id="resume" className="t2-section alt">
        <h3>Resume</h3>
        {data?.resumeFile ? (
          <a
            href={downloadResume(data.resumeFile)}
            target="_blank"
            rel="noreferrer"
            className="t2-btn"
          >
            Download Resume
          </a>
        ) : (
          <p>No resume uploaded.</p>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="t2-section">
        <h3>Contact</h3>
        <form className="t2-contact-form" onSubmit={(e)=>e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Message" required />
          <button type="submit">Send</button>
        </form>
        <div className="t2-contact-info">
          <p>Email: {data?.contact?.email}</p>
          <p>Phone: {data?.contact?.phone}</p>
        </div>
      </section>

      <footer className="t2-footer">
        © {new Date().getFullYear()} {data?.name || "Your Name"} • Built with ApnaFolio
      </footer>
    </div>
  );
}
