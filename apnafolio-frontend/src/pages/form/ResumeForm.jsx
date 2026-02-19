import React, { useState, useEffect } from "react";
import "./ResumeForm.css";
import Cropper from "react-easy-crop";
import Toast from "../../components/Toast";


const DRAFT_KEY = "apnafolio_resume_draft";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_PDF_SIZE = 5 * 1024 * 1024;

export default function ResumeForm({ onSubmit = () => {}, mode, initialData }) {
const [toast, setToast] = useState(null);

  // =============================
  // INITIAL DATA
  // =============================

  const getInitialData = () => {
    if (mode === "edit" && initialData) return initialData;

    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) return JSON.parse(saved);

    return {
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
    };
  };

  const [formData, setFormData] = useState(getInitialData);

  // =============================
  // AUTO SAVE
  // =============================

  useEffect(() => {
    const timeout = setTimeout(() => {
      const cleaned = JSON.parse(JSON.stringify(formData));
      cleaned.resumeFile = null;
      if (cleaned.contact) cleaned.contact.photo = null;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(cleaned));
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);

  // =============================
  // EDIT LOAD
  // =============================

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [initialData, mode]);

  // =============================
  // ADD FIELD
  // =============================

  const addField = (section, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], value]
    }));
  };

  // =============================
  // REMOVE FIELD (FIXED)
  // =============================

  const removeField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // =============================
  // HANDLE CHANGE (FIXED IMMUTABLE)
  // =============================

  const handleChange = (e, section, index, field) => {
    const { name, value, files } = e.target;

    if (files?.[0]) {
      const file = files[0];

      if (file.type.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
        // alert("Image must be under 2MB");
        setToast({ message: "Image must be under 2MB", type: "error" });

        return;
      }

      if (file.type === "application/pdf" && file.size > MAX_PDF_SIZE) {
        // alert("PDF must be under 5MB");
        setToast({ message: "PDF must be under 5MB", type: "error" });
        return;
      }
    }

    if (section) {
      setFormData(prev => {
        const updated = [...prev[section]];
        updated[index] = {
          ...updated[index],
          [field]: files ? files[0] : value
        };
        return { ...prev, [section]: updated };
      });
      return;
    }

    if (name.includes("contact.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: files ? files[0] : value
        }
      }));
      return;
    }

    if (name === "resumeFile") {
      setFormData(prev => ({
        ...prev,
        resumeFile: files ? files[0] : value
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // =============================
  // SKILL UPDATE FIXED
  // =============================

  const updateSkill = (section, index, value) => {
    setFormData(prev => {
      const updated = [...prev[section]];
      updated[index] = value;
      return { ...prev, [section]: updated };
    });
  };

  // =============================
  // SUBMIT
  // =============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role) {
      // alert("Please fill Name & Role");
      setToast({ message: "Please fill Name & Role", type: "error" });
      return;
    }

    onSubmit(formData);
    localStorage.removeItem(DRAFT_KEY);
  };

  // =============================
  // IMAGE CROP (UNCHANGED)
  // =============================

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
        }, "image/jpeg");
      };
    });
  };
// =============================
  // UI RETURN — IMPROVED JSX
  // (Paste this as the return() of ResumeForm)
  // =============================

  return (
    <>{toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}

    <form className="resume-form" onSubmit={handleSubmit}>

      {/* ── HEADER ── */}
      <div className="form-header">
        <div className="form-header__badge">ApnaFolio</div>
        <h2>Portfolio Builder</h2>
        <p className="form-subtitle">Fill in your details to build your professional portfolio</p>
      </div>

      {/* ── BASIC INFO ── */}
      <div className="form-section" style={{ "--delay": "0.05s" }}>
        <div className="section-title">
          <span className="section-icon">👤</span>
          <span>Basic Info</span>
        </div>
        <div className="form-grid-2">
          <div className="field-group">
            <label>Full Name <span className="required">*</span></label>
            <input type="text" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Role / Title <span className="required">*</span></label>
            <input type="text" name="role" placeholder="e.g. Full Stack Developer" value={formData.role} onChange={handleChange} required />
          </div>
        </div>
        <div className="field-group">
          <label>Professional Summary</label>
          <textarea name="summary" placeholder="Write a short summary about yourself..." value={formData.summary} onChange={handleChange} />
        </div>
      </div>

      {/* ── CONTACT INFO ── */}
      <div className="form-section" style={{ "--delay": "0.1s" }}>
        <div className="section-title">
          <span className="section-icon">📬</span>
          <span>Contact Info</span>
        </div>

        <div className="form-grid-2">
          <div className="field-group">
            <label>Email <span className="required">*</span></label>
            <input type="email" name="contact.email" placeholder="you@example.com" value={formData.contact.email} onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label>Phone</label>
            <input type="text" name="contact.phone" placeholder="+91 98765 43210" value={formData.contact.phone} onChange={handleChange} />
          </div>
          <div className="field-group">
            <label>Location</label>
            <input type="text" name="contact.location" placeholder="City, State" value={formData.contact.location} onChange={handleChange} />
          </div>
          <div className="field-group">
            <label>GitHub <span className="optional">(optional)</span></label>
            <input type="url" name="contact.github" placeholder="https://github.com/username" value={formData.contact.github} onChange={handleChange} />
          </div>
          <div className="field-group">
            <label>LinkedIn <span className="optional">(optional)</span></label>
            <input type="url" name="contact.linkedin" placeholder="https://linkedin.com/in/username" value={formData.contact.linkedin} onChange={handleChange} />
          </div>
          <div className="field-group">
            <label>Website <span className="optional">(optional)</span></label>
            <input type="url" name="contact.website" placeholder="https://yourwebsite.com" value={formData.contact.website} onChange={handleChange} />
          </div>
        </div>

        <div className="field-group photo-upload-group">
          <label>Profile Photo</label>
          <div className="file-upload-box">
            <span className="file-upload-icon">🖼️</span>
            <span className="file-upload-text">Click to upload photo <span className="file-hint">(max 2MB)</span></span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > MAX_IMAGE_SIZE) {
                  // alert("Image size must be less than 2MB");
                  setToast({ message: "Image size must be less than 2MB", type: "error" });
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setImageSrc(reader.result);
                  setShowCrop(true);
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div className="form-section" style={{ "--delay": "0.15s" }}>
        <div className="section-title">
          <span className="section-icon">⚡</span>
          <span>Skills</span>
        </div>

        <div className="skills-grid">
          {["frontendSkills", "backendSkills", "tools", "programmingLanguages"].map((section) => (
            <div key={section} className="nested-section">
              <h4>{section.replace(/([A-Z])/g, " $1")}</h4>
              {formData[section]?.map((s, i) => (
                <div key={i} className="skill-row">
                  <input
                    type="text"
                    placeholder={`Add ${section.replace(/([A-Z])/g, " $1").trim().toLowerCase()}`}
                    value={s}
                    onChange={(e) => {
                      let updated = [...formData[section]];
                      updated[i] = e.target.value;
                      setFormData({ ...formData, [section]: updated });
                    }}
                  />
                  <button type="button" className="remove-btn icon-btn" onClick={() => removeField(section, i)} title="Remove">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={() => addField(section, "")}>
                + Add Skill
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div className="form-section" style={{ "--delay": "0.2s" }}>
        <div className="section-title">
          <span className="section-icon">🚀</span>
          <span>Projects</span>
        </div>

        {formData.projects.map((p, i) => (
          <div key={i} className="nested-section">
            <div className="nested-section-header">
              <span className="nested-index">Project {i + 1}</span>
              <button type="button" className="remove-btn" onClick={() => removeField("projects", i)}>
                ✕ Remove
              </button>
            </div>
            <div className="form-grid-2">
              <div className="field-group">
                <label>Title</label>
                <input type="text" placeholder="Project name" value={p.title} onChange={(e) => handleChange(e, "projects", i, "title")} />
              </div>
              <div className="field-group">
                <label>Link</label>
                <input type="url" placeholder="https://..." value={p.link} onChange={(e) => handleChange(e, "projects", i, "link")} />
              </div>
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea placeholder="What does this project do?" value={p.description} onChange={(e) => handleChange(e, "projects", i, "description")} />
            </div>
            <div className="form-grid-2">
              <div className="field-group">
                <label>Tags <span className="optional">(comma separated)</span></label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={p.tags?.join(", ") || ""}
                  onChange={(e) => {
                    let updated = [...formData.projects];
                    updated[i].tags = e.target.value ? e.target.value.split(",").map((tag) => tag.trim()) : [];
                    setFormData({ ...formData, projects: updated });
                  }}
                />
              </div>
              <div className="field-group">
                <label>Project Document</label>
                <div className="file-upload-box compact">
                  <input type="file" onChange={(e) => handleChange(e, "projects", i, "document")} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="add-btn full-width" onClick={() => addField("projects", { title: "", description: "", link: "", document: null, tags: [] })}>
          + Add Project
        </button>
      </div>

      {/* ── EDUCATION ── */}
      <div className="form-section" style={{ "--delay": "0.25s" }}>
        <div className="section-title">
          <span className="section-icon">🎓</span>
          <span>Education</span>
        </div>

        {formData.education.map((ed, i) => (
          <div key={i} className="nested-section">
            <div className="nested-section-header">
              <span className="nested-index">Education {i + 1}</span>
              <button type="button" className="remove-btn" onClick={() => removeField("education", i)}>
                ✕ Remove
              </button>
            </div>
            <div className="form-grid-3">
              <div className="field-group">
                <label>Degree</label>
                <input type="text" placeholder="B.Tech CSE" value={ed.degree} onChange={(e) => handleChange(e, "education", i, "degree")} />
              </div>
              <div className="field-group">
                <label>School / College</label>
                <input type="text" placeholder="University name" value={ed.school} onChange={(e) => handleChange(e, "education", i, "school")} />
              </div>
              <div className="field-group">
                <label>Year</label>
                <input type="text" placeholder="2021 – 2025" value={ed.year} onChange={(e) => handleChange(e, "education", i, "year")} />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="add-btn full-width" onClick={() => addField("education", { degree: "", school: "", year: "" })}>
          + Add Education
        </button>
      </div>

      {/* ── EXPERIENCE ── */}
      <div className="form-section" style={{ "--delay": "0.3s" }}>
        <div className="section-title">
          <span className="section-icon">💼</span>
          <span>Experience</span>
        </div>

        {formData.experience.map((ex, i) => (
          <div key={i} className="nested-section">
            <div className="nested-section-header">
              <span className="nested-index">Experience {i + 1}</span>
              <button type="button" className="remove-btn" onClick={() => removeField("experience", i)}>
                ✕ Remove
              </button>
            </div>
            <div className="form-grid-3">
              <div className="field-group">
                <label>Job Title</label>
                <input type="text" placeholder="Frontend Developer" value={ex.title} onChange={(e) => handleChange(e, "experience", i, "title")} />
              </div>
              <div className="field-group">
                <label>Company</label>
                <input type="text" placeholder="Company name" value={ex.company} onChange={(e) => handleChange(e, "experience", i, "company")} />
              </div>
              <div className="field-group">
                <label>Duration</label>
                <input type="text" placeholder="Jan 2023 – Present" value={ex.duration} onChange={(e) => handleChange(e, "experience", i, "duration")} />
              </div>
            </div>
            <div className="field-group">
              <label>Experience Document</label>
              <div className="file-upload-box compact">
                <input type="file" onChange={(e) => handleChange(e, "experience", i, "document")} />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="add-btn full-width" onClick={() => addField("experience", { title: "", company: "", duration: "", document: null })}>
          + Add Experience
        </button>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div className="form-section" style={{ "--delay": "0.35s" }}>
        <div className="section-title">
          <span className="section-icon">🏅</span>
          <span>Certifications</span>
        </div>

        {formData.certifications.map((c, i) => (
          <div key={i} className="nested-section">
            <div className="nested-section-header">
              <span className="nested-index">Certificate {i + 1}</span>
              <button type="button" className="remove-btn" onClick={() => removeField("certifications", i)}>
                ✕ Remove
              </button>
            </div>
            <div className="form-grid-2">
              <div className="field-group">
                <label>Certification Name</label>
                <input type="text" placeholder="AWS Certified Developer" value={c.name} onChange={(e) => handleChange(e, "certifications", i, "name")} />
              </div>
              <div className="field-group">
                <label>Certificate Document</label>
                <div className="file-upload-box compact">
                  <input type="file" onChange={(e) => handleChange(e, "certifications", i, "document")} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="add-btn full-width" onClick={() => addField("certifications", { name: "", document: null })}>
          + Add Certification
        </button>
      </div>

      {/* ── RESUME UPLOAD ── */}
      <div className="form-section" style={{ "--delay": "0.4s" }}>
        <div className="section-title">
          <span className="section-icon">📄</span>
          <span>Resume</span>
        </div>
        <div className="file-upload-box large">
          <span className="file-upload-icon">📎</span>
          <span className="file-upload-text">Upload your Resume <span className="file-hint">(.pdf, .doc, .docx — max 5MB)</span></span>
          <input type="file" name="resumeFile" accept=".pdf,.doc,.docx" onChange={handleChange} />
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <button type="submit" className="submit-btn">
        {/* {loading && <Spinner overlay label="Saving..." />} */}
        <span>Save Portfolio</span>
        <span className="submit-arrow">→</span>
      </button>

      {/* ── CROP MODAL ── */}
      {showCrop && (
        <div className="crop-modal">
          <div className="crop-wrapper">
            <div className="crop-modal-header">
              <span>Crop Profile Photo</span>
            </div>
            <div className="crop-area">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
              />
            </div>
            <div className="crop-controls">
              <label className="crop-zoom-label">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <div className="crop-buttons">
                <button
                  type="button"
                  onClick={async () => {
                    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, photo: croppedImage },
                    });
                    setShowCrop(false);
                  }}
                >
                  ✓ Save Photo
                </button>
                <button type="button" onClick={() => setShowCrop(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </form>
    </>
  );
}
