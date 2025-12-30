import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Template5.css";

export default function Template5({ data }) {
  const d = data || {};
  const [menuOpen, setMenuOpen] = useState(false);

  const safeIcon = (s) => {
    if (!s) return "/icons/default.png";
    const safe = String(s).toLowerCase().replace(/\s|\+|\.|#/g, "_");
    return `/icons/${safe}/${safe}-original.svg`;
  };

  const socialIcon = (name) => `/icons/social/${name}.png`;

  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  // 🔥 SAFE Cloudinary download helper
  const download = (url) => `${url}?fl_attachment`;

  return (
    <div className="tpl4-premium">
      <Helmet>
        <title>{d.name || "ApnaFolio"} | {d.role || "Portfolio"}</title>
        <meta name="description" content={d.summary || "Personal portfolio on ApnaFolio"} />
        <meta property="og:title" content={`${d.name} | ${d.role}`} />
        <meta property="og:description" content={d.summary} />
        <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
      </Helmet>

      <div className="bg-anim" aria-hidden="true" />

      {/* NAVBAR */}
      <header className="tpl4-nav">
        <div className="brand">{d.name || "ApnaFolio"}</div>

        <nav className={`tpl4-links ${menuOpen ? "open" : ""}`}>
          {[
            "hero","about","skills","projects","education",
            "experience","certifications","resume","contact",
          ].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="tpl4-link"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>

        <button
          className="tpl4-hamb"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* HERO */}
      <section id="hero" className="tpl4-hero">
        <div className="hero-inner glass">
          <div className="profile-wrap">
            <div className="holo-ring" />
            <img
              src={d.contact?.photo || "/default-avatar.png"}
              alt={d.name}
              className="profile-pic"
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
          </div>

          <div className="hero-meta">
            <h1 className="hero-name">{d.name || "Your Name"}</h1>
            <p className="hero-role">{d.role || "Your Role"}</p>
            <p className="hero-tagline">
              {d.tagline || d.summary || "Short tagline"}
            </p>

            <div className="hero-ctas">
              {d.resumeFile && (
                <a
                  className="btn primary"
                  href={download(d.resumeFile)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resume
                </a>
              )}
              {d.projects?.length > 0 && (
                <a className="btn ghost" href="#projects">
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
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="tpl4-section alt">
        <div className="section-inner">
          <h2>Skills</h2>
          <div className="skills-orb-grid">
            {subcats.map((sc) => {
              const arr = d[sc.key] || [];
              if (!arr.length) return null;
              return (
                <div key={sc.key} className="skills-col">
                  <h4>{sc.title}</h4>
                  <div className="orbs">
                    {arr.map((s, i) => (
                      <div key={i} className="orb">
                        <img
                          src={safeIcon(s)}
                          alt={s}
                          onError={(e) =>
                            (e.currentTarget.src = "/icons/default.png")
                          }
                        />
                        <span className="orb-label">{s}</span>
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
        <section id="projects" className="tpl4-section">
          <div className="section-inner">
            <h2>Projects</h2>
            <div className="projects-grid">
              {d.projects.map((p, i) => (
                <article key={i} className="proj-card">
                  <div className="proj-body">
                    <h3>{p.title}</h3>
                    <p className="proj-desc">{p.description}</p>
                    <div className="proj-tags">
                      {(p.tags || []).map((t, idx) => (
                        <span key={idx} className="tag">{t}</span>
                      ))}
                    </div>
                    <div className="proj-actions">
                      {p.link && (
                        <a
                          href={p.link}
                          className="small-btn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      )}
                      {p.document && (
                        <a
                          href={download(p.document)}
                          className="small-btn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download Doc
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {d.experience?.length > 0 && (
        <section id="experience" className="tpl4-section">
          <div className="section-inner">
            <h2>Experience</h2>
            <div className="timeline">
              {d.experience.map((ex, i) => (
                <div key={i} className="timeline-item">
                  <div className="ti-left">
                    <div className="company">{ex.company}</div>
                    <div className="duration">{ex.duration}</div>
                  </div>
                  <div className="ti-right">
                    <div className="role">{ex.title}</div>
                    {ex.document && (
                      <a
                        href={download(ex.document)}
                        target="_blank"
                        rel="noreferrer"
                        className="proof"
                      >
                        Download Proof
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {d.certifications?.length > 0 && (
        <section id="certifications" className="tpl4-section alt">
          <div className="section-inner">
            <h2>Certifications</h2>
            <div className="cert-grid">
              {d.certifications.map((c, i) => (
                <div key={i} className="cert-card">
                  <div className="cert-name">{c.name}</div>
                  {c.document && (
                    <a
                      className="cert-proof"
                      href={download(c.document)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
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
        <section id="resume" className="tpl4-section">
          <div className="section-inner">
            <h2>Resume</h2>
            <a
              className="btn primary large"
              href={download(d.resumeFile)}
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="tpl4-contact">
        <div className="contact-inner">
          <div className="contact-form glass">
            <h2>Contact Me</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea placeholder="Message" required />
              <div className="form-actions">
                <button className="btn neon">Send Message</button>
              </div>
            </form>
          </div>

          <aside className="contact-info">
            <div className="info-card">
              <div className="ic-icon">📧</div>
              <div>
                <div className="ic-title">Email</div>
                <div className="ic-value">{d.contact?.email || "-"}</div>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon">📞</div>
              <div>
                <div className="ic-title">Phone</div>
                <div className="ic-value">{d.contact?.phone || "-"}</div>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon">📍</div>
              <div>
                <div className="ic-title">Location</div>
                <div className="ic-value">{d.contact?.location || "-"}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="tpl4-footer">
        © {new Date().getFullYear()} {d.name || "Your Name"} • Built with ApnaFolio
      </footer>
    </div>
  );
}
