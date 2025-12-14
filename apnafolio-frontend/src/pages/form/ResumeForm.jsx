import React, { useState } from "react";
import "./ResumeForm.css";

export default function ResumeForm({ onSubmit = () => {} }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      github: "",
      linkedin: "",
      website: "",
      photo: null,
    },
    frontendSkills: [""],
    backendSkills: [""],
    tools: [""],
    programmingLanguages: [""],
    projects: [{ title: "", description: "", link: "", document: null, tags: [] }],
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ title: "", company: "", duration: "", document: null }],
    certifications: [{ name: "", document: null }],
    resumeFile: null,
  });

  const handleChange = (e, section, index, field) => {
    const { name, value, files } = e.target;

    if (section) {
      let updated = [...formData[section]];
      updated[index][field] = files ? files[0] : value;
      setFormData({ ...formData, [section]: updated });
    } else if (name.includes("contact.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        contact: { ...formData.contact, [key]: files ? files[0] : value },
      });
    } else if (name === "resumeFile") {
      setFormData({ ...formData, resumeFile: files ? files[0] : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (section, obj) => {
    setFormData({ ...formData, [section]: [...formData[section], obj] });
  };

  const removeField = (section, index) => {
    let updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      alert("⚠️ Please fill Name and Role");
      return;
    }
    try {
      onSubmit(formData);
    } catch (err) {
      console.error("ResumeForm submit error:", err);
      alert("❌ Error submitting form, check console.");
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Portfolio Builder</h2>

      {/* Hero Info */}
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Role</label>
      <input type="text" name="role" value={formData.role} onChange={handleChange} required />

      <label>Summary</label>
      <textarea name="summary" value={formData.summary} onChange={handleChange} />

      {/* Contact */}
      <h3>Contact Info</h3>
      <input
        type="email"
        name="contact.email"
        placeholder="Email"
        value={formData.contact.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact.phone"
        placeholder="Phone"
        value={formData.contact.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contact.location"
        placeholder="Location"
        value={formData.contact.location}
        onChange={handleChange}
      />
      {/* ✅ Optional fields */}
      <input
        type="url"
        name="contact.github"
        placeholder="GitHub (optional)"
        value={formData.contact.github}
        onChange={handleChange}
      />
      <input
        type="url"
        name="contact.linkedin"
        placeholder="LinkedIn (optional)"
        value={formData.contact.linkedin}
        onChange={handleChange}
      />
      <input
        type="url"
        name="contact.website"
        placeholder="Website (optional)"
        value={formData.contact.website}
        onChange={handleChange}
      />
      <label>Profile Photo</label>
      <input type="file" name="contact.photo" accept="image/*" onChange={handleChange} />


      {/* Skills */}
      <h3>Skills</h3>
      {["frontendSkills", "backendSkills", "tools", "programmingLanguages"].map((section) => (
        <div key={section} className="nested-section">
          <h4>{section.replace(/([A-Z])/g, " $1")}</h4>
          {formData[section]?.map((s, i) => (
            <div key={i} className="skill-row">
              <input
                type="text"
                placeholder={`${section.replace(/([A-Z])/g, " $1").trim()} Skill`}
                value={s}
                onChange={(e) => {
                  let updated = [...formData[section]];
                  updated[i] = e.target.value;
                  setFormData({ ...formData, [section]: updated });
                }}
              />
              <button type="button" className="remove-btn" onClick={() => removeField(section, i)}>
                ✕
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addField(section, "")}>
            + Add Skill
          </button>
        </div>
      ))}

      {/* Projects */}
      <h3>Projects</h3>
      {formData.projects.map((p, i) => (
        <div key={i} className="nested-section">
          <input type="text" placeholder="Title" value={p.title} onChange={(e) => handleChange(e, "projects", i, "title")} />
          <textarea placeholder="Description" value={p.description} onChange={(e) => handleChange(e, "projects", i, "description")} />
          <input type="url" placeholder="Link" value={p.link} onChange={(e) => handleChange(e, "projects", i, "link")} />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={p.tags?.join(", ") || ""}
            onChange={(e) => {
              let updated = [...formData.projects];
              updated[i].tags = e.target.value ? e.target.value.split(",").map((tag) => tag.trim()) : [];
              setFormData({ ...formData, projects: updated });
            }}
          />
          <label>Project Document</label>
          <input type="file" onChange={(e) => handleChange(e, "projects", i, "document")} />
          <button type="button" className="remove-btn" onClick={() => removeField("projects", i)}>
            Remove Project
          </button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addField("projects", { title: "", description: "", link: "", document: null, tags: [] })}>
        + Add Project
      </button>

      {/* Education */}
      <h3>Education</h3>
      {formData.education.map((ed, i) => (
        <div key={i} className="nested-section">
          <input type="text" placeholder="Degree" value={ed.degree} onChange={(e) => handleChange(e, "education", i, "degree")} />
          <input type="text" placeholder="School" value={ed.school} onChange={(e) => handleChange(e, "education", i, "school")} />
          <input type="text" placeholder="Year" value={ed.year} onChange={(e) => handleChange(e, "education", i, "year")} />
          <button type="button" className="remove-btn" onClick={() => removeField("education", i)}>
            Remove Education
          </button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addField("education", { degree: "", school: "", year: "" })}>
        + Add Education
      </button>

      {/* Experience */}
      <h3>Experience</h3>
      {formData.experience.map((ex, i) => (
        <div key={i} className="nested-section">
          <input type="text" placeholder="Job Title" value={ex.title} onChange={(e) => handleChange(e, "experience", i, "title")} />
          <input type="text" placeholder="Company" value={ex.company} onChange={(e) => handleChange(e, "experience", i, "company")} />
          <input type="text" placeholder="Duration" value={ex.duration} onChange={(e) => handleChange(e, "experience", i, "duration")} />
          <label>Experience Document</label>
          <input type="file" onChange={(e) => handleChange(e, "experience", i, "document")} />
          <button type="button" className="remove-btn" onClick={() => removeField("experience", i)}>
            Remove Experience
          </button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addField("experience", { title: "", company: "", duration: "", document: null })}>
        + Add Experience
      </button>

      {/* Certifications */}
      <h3>Certifications</h3>
      {formData.certifications.map((c, i) => (
        <div key={i} className="nested-section">
          <input type="text" placeholder="Certification Name" value={c.name} onChange={(e) => handleChange(e, "certifications", i, "name")} />
          <label>Certification Document</label>
          <input type="file" onChange={(e) => handleChange(e, "certifications", i, "document")} />
          <button type="button" className="remove-btn" onClick={() => removeField("certifications", i)}>
            Remove Certification
          </button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addField("certifications", { name: "", document: null })}>
        + Add Certification
      </button>

      {/* Resume Upload */}
      <h3>Resume</h3>
      <input type="file" name="resumeFile" accept=".pdf,.doc,.docx" onChange={handleChange} />

      <button type="submit" className="submit-btn">
        Save Portfolio
      </button>
    </form>
  );
}
