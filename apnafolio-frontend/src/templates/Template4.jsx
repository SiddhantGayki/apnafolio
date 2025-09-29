import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Template4.css";

export default function Template4({ data }) {
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
    <div className={`t3-container ${theme}`}>
      <Helmet>
        <title>{data.name || "ApnaFolio"} | {data.role || "Portfolio"}</title>
        <meta name="description" content={data.summary || "Personal portfolio on ApnaFolio"} />
        <meta property="og:title" content={`${data.name} | ${data.role}`} />
        <meta property="og:description" content={data.summary} />
        <meta property="og:image" content={data.contact?.photo || "/default-avatar.png"} />
      </Helmet>
      {/* Navbar */}
      <header className="t3-navbar">
        <div className="t3-logo">{data?.name || "ApnaFolio"}</div>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <nav className={menuOpen ? "active" : ""}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        {/* <button className="t3-theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button> */}
      </header>

      {/* Split Hero */}
      <section id="hero" className="t3-hero">
        <div className="t3-left">
          <motion.img
            src={data?.contact?.photo || "/default-avatar.png"}
            alt={data?.name}
            className="t3-avatar"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="t3-right">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y:0, opacity:1 }}>{data?.name || "Your Name"}</motion.h1>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{data?.role || "Your Role"}</motion.h2>
          <p className="t3-tagline">{data?.summary || "Short tagline about you."}</p>
          <div className="t3-cta">
            <a href="#projects" className="t3-btn">See Projects</a>
            {data?.resumeFile && <a href={data.resumeFile} download className="t3-btn outline">Download Resume</a>}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="t3-section">
        <h3>About Me</h3>
        <p>{data?.summary || "Describe yourself..."}</p>
      </section>

      {/* Skills (interactive cards) */}
      <section id="skills" className="t3-section alt">
        <h3>Skills</h3>
        <div className="t3-skill-rows">
          {subcats.map(sc => {
            const arr = data?.[sc.key] || [];
            if (!arr.length) return null;
            return (
              <div key={sc.key} className="t3-skill-col">
                <h4>{sc.title}</h4>
                <div className="t3-skill-cards">
                  {arr.map((s, i) => {
                    const safe = String(s).toLowerCase().replace(/\s|\+|\.|#/g,"_");
                    const icon = `/icons/${safe}/${safe}-original.svg`;
                    return (
                      <motion.div key={i} className="t3-skill-card" whileHover={{ scale: 1.06 }}>
                        <img src={icon} alt={s} onError={(e)=>e.currentTarget.src="/icons/default.png"} />
                        <span>{s}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="t3-section">
        <h3>Projects</h3>
        <div className="t3-project-grid">
          {(data?.projects||[]).map((p,i)=>(
            <motion.article key={i} className="t3-project" whileHover={{ y:-6 }}>
              {p.image && <img src={p.image} alt={p.title} className="t3-project-media" />}
              {p.video && <video src={p.video} controls className="t3-project-media" />}
              <div className="t3-project-body">
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div className="t3-tags">
                  {(p.tags||[]).map((t,idx)=>(<span key={idx} className="t3-tag">{t}</span>))}
                </div>
                <div className="t3-links">
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                  {p.document && <a href={p.document} download>Doc</a>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="t3-section alt">
        <h3>Education</h3>
        {(data?.education||[]).map((ed,i)=>(
          <div className="t3-card" key={i}><h4>{ed.degree}</h4><p>{ed.school} — {ed.year}</p></div>
        ))}
      </section>

      {/* Experience */}
      {!!(data?.experience||[]).length && <section id="experience" className="t3-section"><h3>Experience</h3>{data.experience.map((ex,i)=>(<div className="t3-card" key={i}><h4>{ex.title}</h4><p>{ex.company} — {ex.duration}</p></div>))}</section>}

      {/* Certifications */}
      {!!(data?.certifications||[]).length && <section id="certifications" className="t3-section alt"><h3>Certifications</h3>{data.certifications.map((c,i)=>(<div className="t3-card" key={i}><p>{c.name}</p></div>))}</section>}

      {/* Resume */}
      <section id="resume" className="t3-section"><h3>Resume</h3>{data?.resumeFile ? <a href={data.resumeFile} download className="t3-btn">Download Resume</a> : <p>No resume uploaded.</p>}</section>

      {/* Contact */}
      <section id="contact" className="t3-section alt">
        <h3>Contact</h3>
        <form className="t3-contact" onSubmit={(e)=>e.preventDefault()}>
          <input placeholder="Your name" required />
          <input placeholder="Your email" type="email" required />
          <textarea placeholder="Message" required />
          <button type="submit" className="t3-btn">Send</button>
        </form>
        <div className="t3-contact-info"><p>Email: {data?.contact?.email}</p><p>Phone: {data?.contact?.phone}</p></div>
      </section>

      <footer className="t3-footer">© {new Date().getFullYear()} {data?.name||"Your Name"} • ApnaFolio</footer>
    </div>
  );
}
