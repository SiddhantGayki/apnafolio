import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SeoWrapper from "../components/SeoWrapper";
import "./Template2.css";

export default function Template2({ data }) {
  const d = data || {};
  const [menuOpen, setMenuOpen] = useState(false);

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  const iconFor = (skill) => {
    if (!skill) return "/icons/default.png";
    const safe = String(skill).toLowerCase().replace(/\s|\+|\.|#/g, "_");
    return `/icons/${safe}/${safe}-original.svg`;
  };

  const socialIcon = (key) => `/icons/social/${key}.png`;

  return (
    <div className="tpl2-glass">
      <SeoWrapper data={data} />
      {/* <Helmet>
              <title>{d.name || "ApnaFolio"} | {d.role || "Portfolio"}</title>
              <meta name="description" content={d.summary || "Personal portfolio on ApnaFolio"} />
              <meta property="og:title" content={`${d.name} | ${d.role}`} />
              <meta property="og:description" content={d.summary} />
              <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
            </Helmet> */}
      {/* NAVBAR */}
      <header className="tpl2-nav">
        <div className="brand">{d.name || "Your Name"}</div>
        <nav className={`links ${menuOpen ? "open" : ""}`}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          {d.projects?.length > 0 && <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>}
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          {d.experience?.length > 0 && <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>}
          {d.certifications?.length > 0 && <a href="#certifications" onClick={() => setMenuOpen(false)}>Certs</a>}
          <a href="#resume" onClick={() => setMenuOpen(false)}>Resume</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="hamb" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* HERO */}
      <section id="hero" className="tpl2-hero">
        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={d.contact?.photo || "/default-avatar.png"}
            alt={d.name}
            className="hero-photo"
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
          />
          <h1>{d.name}</h1>
          <h3>{d.role}</h3>
          <p>{d.tagline || d.summary}</p>

          <div className="hero-ctas">
            {d.resumeFile && (
              <a href={d.resumeFile} download className="btn btn-primary">
                Download Resume
              </a>
            )}
            {d.projects?.length > 0 && (
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
            )}
          </div>

          <div className="hero-socials">
            {d.contact?.github && (
              <a href={d.contact.github} target="_blank" rel="noreferrer">
                <img src={socialIcon("github")} alt="github" />
              </a>
            )}
            {d.contact?.linkedin && (
              <a href={d.contact.linkedin} target="_blank" rel="noreferrer">
                <img src={socialIcon("linkedin")} alt="linkedin" />
              </a>
            )}
            {d.contact?.website && (
              <a href={d.contact.website} target="_blank" rel="noreferrer">
                <img src={socialIcon("website")} alt="website" />
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="tpl2-section">
        <h2>About Me</h2>
        <p>{d.summary}</p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="tpl2-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {subcats.map((sc) => {
            const arr = d[sc.key] || [];
            if (!arr.length) return null;
            return (
              <div className="skill-col" key={sc.key}>
                <h4>{sc.title}</h4>
                <div className="skill-items">
                  {arr.map((s, idx) => (
                    <motion.div key={idx} className="skill-pill" whileHover={{ scale: 1.1 }}>
                      <img
                        src={iconFor(s)}
                        alt={s}
                        onError={(e) => (e.currentTarget.src = "/icons/default.png")}
                      />
                      <span>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      {d.projects?.length > 0 && (
        <section id="projects" className="tpl2-section">
          <h2>Projects</h2>
          <div className="proj-grid">
            {d.projects.map((p, i) => (
              <motion.div key={i} className="card" whileHover={{ y: -6 }}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="proj-tags">
                      {(p.tags || []).map((t, idx) => (
                        <span key={idx} className="tag">{t}</span>
                      ))}
                    </div>
                <div className="proj-links">
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live</a>}
                  {p.document && <a href={p.document} download>Doc</a>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      <section id="education" className="tpl2-section">
        <h2>Education</h2>
        {d.education?.map((ed, i) => (
          <div key={i} className="card">
            <strong>{ed.degree}</strong>
            <p>{ed.school} • {ed.year}</p>
          </div>
        ))}
      </section>

      {/* EXPERIENCE */}
      {d.experience?.length > 0 && (
        <section id="experience" className="tpl2-section">
          <h2>Experience</h2>
          {d.experience.map((ex, i) => (
            <div key={i} className="card">
              <strong>{ex.title}</strong>
              <p>{ex.company} • {ex.duration}</p>
              {ex.document && <a href={ex.document} download>Proof</a>}
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {d.certifications?.length > 0 && (
        <section id="certifications" className="tpl2-section">
          <h2>Certifications</h2>
          {d.certifications.map((c, i) => (
            <div key={i} className="card">
              <p>{c.name}</p>
              {c.document && <a href={c.document} download>View</a>}
            </div>
          ))}
        </section>
      )}

      {/* RESUME */}
      <section id="resume" className="tpl2-section">
        <h2>Resume</h2>
        {d.resumeFile ? (
          <a href={d.resumeFile} download className="btn btn-primary">Download Resume</a>
        ) : <p>No resume uploaded.</p>}
      </section>

      {/* CONTACT */}
      <section id="contact" className="tpl2-section contact">
        <h2>Contact</h2>
          <div className="contact-in">
            <p>Email: {d.contact?.email}</p>
            <p>Phone: {d.contact?.phone}</p>
            <p>Location: {d.contact?.location}</p>
          </div>
          <div className="contact-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" required />
              <button type="submit">Send</button>
            </form>
          </div>
      </section>

      <footer className="tpl2-footer">
        © {new Date().getFullYear()} {d.name || "Your Name"} • Built with ApnaFolio
      </footer>
    </div>
  );
}
