import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import dummyResume from "../constants/dummyResume";
import "./Template7.css";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Template7({ data = dummyResume }){
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="template5">
      <Helmet>
  <title>{data?.name || "ApnaFolio"} | {data?.role || "Portfolio"}</title>
  <meta name="description" content={data?.summary || "Personal portfolio on ApnaFolio"} />
  <meta property="og:title" content={`${data?.name} | ${data?.role}`} />
  <meta property="og:description" content={data?.summary} />
  <meta property="og:image" content={data?.contact?.photo || "/default-avatar.png"} />
</Helmet>

      {/* ================= NAVBAR ================= */}
      <header className="t5-navbar">
        <div className="t5-brand">{dummyResume.name}</div>

        <button
          className="t5-hamburger"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`t5-nav ${navOpen ? "open" : ""}`}>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="t5-hero" id="about">
        <div className="t5-hero-inner">
          <div className="t5-hero-card">
            <div className="t5-profile">
              <img src={dummyResume.contact.photo} alt={dummyResume.name} />
            </div>
            <div className="t5-hero-text">
              <h1>{dummyResume.name}</h1>
              <h2>{dummyResume.role}</h2>
              <p className="t5-tagline">{dummyResume.summary}</p>
            </div>
            <div className="t5-ctas">
              <a href={dummyResume.resumeFile} target="_blank" rel="noreferrer">
                <button className="t5-resume">📄 Resume</button>
              </a>
              <a href={dummyResume.contact.website} target="_blank" rel="noreferrer">
                <button className="t5-visit">🌐 Visit</button>
              </a>
            </div>
          </div>
        </div>
        <div className="t5-bg">
          <div className="t5-blob b1"></div>
          <div className="t5-blob b2"></div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="t5-section" id="skills">
        <div className="t5-section-inner">
          <h3>Skills</h3>
          <h4>Frontend</h4>
          <p>{dummyResume.frontendSkills.join(", ")}</p>
          <h4>Backend</h4>
          <p>{dummyResume.backendSkills.join(", ")}</p>
          <h4>Tools</h4>
          <p>{dummyResume.tools.join(", ")}</p>
          <h4>Programming Languages</h4>
          <p>{dummyResume.programmingLanguages.join(", ")}</p>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="t5-section" id="projects">
        <div className="t5-section-inner">
          <h3>Projects</h3>
          <div className="t5-projects-grid">
            {dummyResume.projects.map((project, idx) => (
              <div key={idx} className="t5-project-card">
                <div className="t5-project-body">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="t5-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="t5-tag">{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer">🔗 GitHub</a> |{" "}
                  <a href={project.document} target="_blank" rel="noreferrer">📄 Doc</a>
                  <div style={{ marginTop: "0.5rem" }}>
                    <video width="100%" controls src={project.video}></video>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="t5-section" id="experience">
        <div className="t5-section-inner">
          <h3>Experience</h3>
          {dummyResume.experience.map((exp, idx) => (
            <div key={idx}>
              <h4>{exp.title} – {exp.company}</h4>
              <p>{exp.duration}</p>
              <a href={exp.document} target="_blank" rel="noreferrer">📄 Document</a>
              <hr style={{ margin: "1rem 0", borderColor: "rgba(255,255,255,0.1)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="t5-section" id="education">
        <div className="t5-section-inner">
          <h3>Education</h3>
          {dummyResume.education.map((edu, idx) => (
            <div key={idx}>
              <h4>{edu.degree}</h4>
              <p>{edu.school} – {edu.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section className="t5-section" id="certifications">
        <div className="t5-section-inner">
          <h3>Certifications</h3>
          {dummyResume.certifications.map((cert, idx) => (
            <div key={idx}>
              <p>{cert.name} – <a href={cert.document} target="_blank" rel="noreferrer">📄 View</a></p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="t5-section" id="contact">
        <div className="t5-section-inner">
          <h3>Contact</h3>
          <p>📧 {dummyResume.contact.email}</p>
          <p>📞 {dummyResume.contact.phone}</p>
          <p>📍 {dummyResume.contact.location}</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <a href={dummyResume.contact.github} target="_blank" rel="noreferrer"><FaGithub size={22} /></a>
            <a href={dummyResume.contact.linkedin} target="_blank" rel="noreferrer"><FaLinkedin size={22} /></a>
            <a href={dummyResume.contact.website} target="_blank" rel="noreferrer"><FaGlobe size={22} /></a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="t5-footer">
        © {new Date().getFullYear()} {dummyResume.name}. All rights reserved.
      </footer>
    </div>
  );
}
