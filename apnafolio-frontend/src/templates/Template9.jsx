import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import dummyResume from "../constants/dummyResume";
import "./Template9.css";

export default function Template9({ data = dummyResume }) {
  const [theme, setTheme] = useState("light");
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
    <div className={`t6-container ${theme}`}>
      <Helmet>
  <title>{data?.name || "ApnaFolio"} | {data?.role || "Portfolio"}</title>
  <meta name="description" content={data?.summary || "Personal portfolio on ApnaFolio"} />
  <meta property="og:title" content={`${data?.name} | ${data?.role}`} />
  <meta property="og:description" content={data?.summary} />
  <meta property="og:image" content={data?.contact?.photo || "/default-avatar.png"} />
</Helmet>

      {/* Navbar */}
      <header className="t6-navbar">
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
      <section id="hero" className="t6-hero">
        <motion.div
          className="t6-hero-bg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />
        <motion.img
          src={data?.contact?.photo}
          alt={data?.name}
          className="t6-avatar"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.8 }}>
          {data?.name}
        </motion.h1>
        <motion.h2 initial={{ y: 30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.8, delay:0.3 }}>
          {data?.role}
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
          {data?.summary}
        </motion.p>
      </section>

      {/* About */}
      <section id="about" className="t6-section">
        <h3>About Me</h3>
        <p>{data?.summary}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="t6-section alt">
        <h3>Skills</h3>
        <div className="t6-skills-grid">
          {subcats.map(sc => {
            const arr = data?.[sc.key] || [];
            if (!arr.length) return null;
            return (
              <div key={sc.key} className="t6-skills-subcat">
                <h4>{sc.title}</h4>
                <div className="t6-skill-bars">
                  {arr.map((s, i) => (
                    <motion.div
                      key={i}
                      className="t6-skill-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${80 + i*3}%` }}
                      transition={{ duration: 1, delay: i*0.2 }}
                    >
                      <span>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="t6-section">
        <h3>Projects</h3>
        <div className="t6-projects-grid">
          {data?.projects?.map((p, i) => (
            <motion.div
              key={i}
              className="t6-project-card"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.4)" }}
            >
              {p.video ? <video src={p.video} controls className="t6-project-media" /> :
               p.image ? <img src={p.image} alt={p.title} className="t6-project-media" /> : null}
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="t6-tags">
                {p.tags.map((t, idx) => <span key={idx} className="t6-tag">{t}</span>)}
              </div>
              <div className="t6-links">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                {p.document && <a href={p.document} download>Doc</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="t6-section alt">
        <h3>Education</h3>
        {data?.education?.map((ed,i) => (
          <div key={i} className="t6-card">
            <h4>{ed.degree}</h4>
            <p>{ed.school} — {ed.year}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      {!!(data?.experience?.length) && (
        <section id="experience" className="t6-section">
          <h3>Experience</h3>
          {data.experience.map((ex,i)=>(
            <div key={i} className="t6-card">
              <h4>{ex.title}</h4>
              <p>{ex.company} — {ex.duration}</p>
              {ex.document && <a href={ex.document} download>Doc</a>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {!!(data?.certifications?.length) && (
        <section id="certifications" className="t6-section alt">
          <h3>Certifications</h3>
          {data.certifications.map((c,i)=>(
            <div key={i} className="t6-card">
              <p>{c.name}</p>
              {c.document && <a href={c.document} download>Doc</a>}
            </div>
          ))}
        </section>
      )}

      {/* Resume */}
      <section id="resume" className="t6-section">
        <h3>Resume</h3>
        {data?.resumeFile ? <a href={data.resumeFile} download className="t6-btn">Download Resume</a> : <p>No resume uploaded</p>}
      </section>

      {/* Contact */}
      <section id="contact" className="t6-section alt">
        <h3>Contact</h3>
        <form className="t6-contact-form" onSubmit={e=>e.preventDefault()}>
          <input type="text" placeholder="Your Name" required/>
          <input type="email" placeholder="Your Email" required/>
          <textarea placeholder="Message" required/>
          <button type="submit">Send</button>
        </form>
        <div className="t6-contact-info">
          <p>Email: {data?.contact?.email}</p>
          <p>Phone: {data?.contact?.phone}</p>
          <p>Location: {data?.contact?.location}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="t6-footer">
        © {new Date().getFullYear()} {data?.name} • Built with ApnaFolio
      </footer>
    </div>
  );
}
