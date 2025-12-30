import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Template3.css";

export default function Template3({ data }) {
  const d = data || {};
  const [menuOpen, setMenuOpen] = useState(false);

  const safeIcon = (s) => {
    if (!s) return "/icons/default.png";
    const safe = String(s).toLowerCase().replace(/\s|\+|\.|#/g, "_");
    return `/icons/${safe}/${safe}-original.svg`;
  };

  const socialIcon = (name) => `/icons/social/${name}.png`;

  const sections = [
    "hero",
    "about",
    "skills",
    "projects",
    "education",
    "experience",
    "certifications",
    "resume",
    "contact",
  ];

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  return (
    <div className="tpl6-container">
      <Helmet>
        <title>{d.name || "ApnaFolio"} | {d.role || "Portfolio"}</title>
        <meta
          name="description"
          content={d.summary || "Personal portfolio on ApnaFolio"}
        />
        <meta property="og:title" content={`${d.name} | ${d.role}`} />
        <meta property="og:description" content={d.summary} />
        <meta
          property="og:image"
          content={d.contact?.photo || "/default-avatar.png"}
        />
      </Helmet>

      {/* NAVBAR */}
      <header className="tpl6-nav">
        <div className="brand">{d.name || "ApnaFolio"}</div>
        <nav className={`tpl6-links ${menuOpen ? "open" : ""}`}>
          {sections.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </nav>
        <button
          className="hamb"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* HERO */}
      <section id="hero" className="tpl6-hero diag">
        <div className="hero-inner">
          <div className="hero-photo">
            <img
              src={d.contact?.photo || "/default-avatar.png"}
              alt={d.name}
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
          </div>
          <div className="hero-text">
            <h1>{d.name || "Your Name"}</h1>
            <h2>{d.role || "Your Role"}</h2>
            <p>{d.summary || "Short tagline about yourself…"}</p>
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
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="tpl6-section">
        <div className="inner">
          <h2>About Me</h2>
          <p>{d.summary || "Write a friendly paragraph about yourself."}</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="tpl6-section alt">
        <div className="inner">
          <h2>Skills</h2>
          <div className="skills-grid">
            {subcats.map((sc) => {
              const arr = d[sc.key] || [];
              if (!arr.length) return null;
              return (
                <div key={sc.key} className="skill-col">
                  <h4>{sc.title}</h4>
                  <div className="skill-items">
                    {arr.map((s, i) => (
                      <div key={i} className="skill-item">
                        <img
                          src={safeIcon(s)}
                          alt={s}
                          onError={(e) =>
                            (e.currentTarget.src = "/icons/default.png")
                          }
                        />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      {d.projects?.length > 0 && (
        <section id="projects" className="tpl6-section">
          <div className="inner">
            <h2>Projects</h2>
            <div className="projects-grid">
              {d.projects.map((p, i) => (
                <div key={i} className="proj-card">
                  <div className="proj-body">
                    <h3>{p.title}</h3>
                    <p className="proj-desc">{p.description}</p>
                    <div className="proj-tags">
                      {(p.tags || []).map((t, idx) => (
                        <span key={idx} className="tag">
                          {t}
                        </span>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      <section id="education" className="tpl6-section alt">
        <div className="inner">
          <h2>Education</h2>
          <div className="edu-list">
            {(d.education || []).map((ed, i) => (
              <div key={i} className="edu-card">
                <h4>{ed.degree}</h4>
                <p>
                  {ed.school} • {ed.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      {d.experience?.length > 0 && (
        <section id="experience" className="tpl6-section">
          <div className="inner">
            <h2>Experience</h2>
            <div className="exp-list">
              {d.experience.map((ex, i) => (
                <div key={i} className="exp-card">
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
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {d.certifications?.length > 0 && (
        <section id="certifications" className="tpl6-section alt">
          <div className="inner">
            <h2>Certifications</h2>
            <div className="cert-list">
              {d.certifications.map((c, i) => (
                <div key={i} className="cert-card">
                  <p>{c.name}</p>
                  {c.document && (
                    <a href={c.document} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESUME */}
      {d.resumeFile && (
        <section id="resume" className="tpl6-section">
          <div className="inner">
            <h2>Resume</h2>
           <a
              href={`${data.resumeFile}?fl_attachment`}
              target="_blank"
              rel="noreferrer"
              className="t3-btn"
            >
              Download Resume
            </a>

          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="tpl6-contact diag">
        <div className="inner contact-grid">
          <div className="contact-form">
            <h3>Contact Me</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" required />
              <button type="submit">Send</button>
            </form>
          </div>
          <div className="contact-in">
            <p>Email: {d.contact?.email}</p>
            <p>Phone: {d.contact?.phone}</p>
            <p>Location: {d.contact?.location}</p>
          </div>
        </div>
      </section>

      <footer className="tpl6-footer">
        © {new Date().getFullYear()} {d.name || "Your Name"} • Built with
        ApnaFolio
      </footer>
    </div>
  );
}
