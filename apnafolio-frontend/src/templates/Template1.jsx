import React, { useState } from "react";
import SeoWrapper from "../components/SeoWrapper";
import { Helmet } from "react-helmet-async";

import "./Template1.css";

export default function Template1({ data }) {
  const d = data || {};
  const [menuOpen, setMenuOpen] = useState(false);

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  const socialIcon = (name) => `/icons/social/${name}.png`;

  return (
    <div className="tpl4-container">
      {/* SEO */}
      <SeoWrapper data={data} />

      {/* Navbar */}
      <header className="tpl4-nav">
        <div className="brand">{d.name || "Your Name"}</div>
        <nav className={`tpl4-links ${menuOpen ? "open" : ""}`}>
          {[
            "hero",
            "about",
            "skills",
            "projects",
            "education",
            "experience",
            "certifications",
            "resume",
            "contact",
          ].map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <button className="hamb" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="tpl4-hero">
        <img
          src={d.contact?.photo || "/default-avatar.png"}
          alt={d.name}
          className="hero-photo"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
        />
        <h1 className="neon-text">{d.name || "Your Name"}</h1>
        <h2>{d.role || "Your Role"}</h2>
        <p>{d.summary || "Short tagline goes here."}</p>
        <div className="hero-socials">
          {d.contact?.github && (
            <a href={d.contact.github} target="_blank" rel="noreferrer">
              <img src={socialIcon("github")} alt="GitHub" />
            </a>
          )}
          {d.contact?.linkedin && (
            <a href={d.contact.linkedin} target="_blank" rel="noreferrer">
              <img src={socialIcon("linkedin")} alt="LinkedIn" />
            </a>
          )}
          {d.contact?.website && (
            <a href={d.contact.website} target="_blank" rel="noreferrer">
              <img src={socialIcon("website")} alt="Website" />
            </a>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="tpl4-section">
        <h2>About Me</h2>
        <p>{d.summary}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="tpl4-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {subcats.map((sc) => {
            const arr = d[sc.key] || [];
            if (!arr.length) return null;
            return (
              <div key={sc.key} className="skill-col">
                <h4>{sc.title}</h4>
                <div className="skill-icons">
                  {arr.map((s, i) => {
                    const safe = s.toLowerCase().replace(/\s|\+|\.|#/g, "_");
                    const icon = `/icons/${safe}/${safe}-original.svg`;
                    return (
                      <div key={i} className="skill-orb">
                        <img
                          src={icon}
                          alt={s}
                          onError={(e) =>
                            (e.currentTarget.src = "/icons/default.png")
                          }
                        />
                        <span>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      {d.projects?.length > 0 && (
        <section id="projects" className="tpl4-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            {d.projects.map((p, i) => (
              <div key={i} className="proj-card">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="proj-tags">
                  {(p.tags || []).map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
                <div className="proj-actions">
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  {p.document && (
                    <a href={p.document} target="_blank" rel="noreferrer">
                      Doc
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section id="education" className="tpl4-section">
        <h2>Education</h2>
        {(d.education || []).map((ed, i) => (
          <div key={i} className="card">
            <h4>{ed.degree}</h4>
            <p>
              {ed.school} • {ed.year}
            </p>
          </div>
        ))}
      </section>

      {/* Experience */}
      {d.experience?.length > 0 && (
        <section id="experience" className="tpl4-section">
          <h2>Experience</h2>
          {d.experience.map((ex, i) => (
            <div key={i} className="card">
              <h4>{ex.title}</h4>
              <p>
                {ex.company} • {ex.duration}
              </p>
              {ex.document && (
                <a href={ex.document} target="_blank" rel="noreferrer">
                  Proof
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {d.certifications?.length > 0 && (
        <section id="certifications" className="tpl4-section">
          <h2>Certifications</h2>
          {d.certifications.map((c, i) => (
            <div key={i} className="card">
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
      {d.resumeFile && (
        <section id="resume" className="tpl4-section">
          <h2>Resume</h2>
          <a
            href={`${data.resumeFile}?fl_attachment`}
            target="_blank"
            rel="noreferrer"
            className="t3-btn"
          >
            Download Resume
          </a>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="tpl4-section contact">
        <h2>Contact</h2>
        <div className="contact-info">
          <p>Email: {d.contact?.email}</p>
          <p>Phone: {d.contact?.phone}</p>
          <p>Location: {d.contact?.location}</p>
        </div>
      </section>

      <footer className="tpl4-footer">
        © {new Date().getFullYear()} {d.name || "Your Name"} • Built with
        ApnaFolio
      </footer>
    </div>
  );
}
