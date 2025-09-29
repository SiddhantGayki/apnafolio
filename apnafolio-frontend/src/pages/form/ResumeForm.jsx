// import { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../../utils/auth";
// import Spinner from "../../components/Spinner";

// export default function ResumeForm() {
//   const [form, setForm] = useState({
//     name: "", role: "", email: "", phone: "", location: "",
//     summary: "", skills: [""],
//     education: [{ degree: "", school: "", year: "" }],
//     projects: [{ title: "", description: "", link: "" }],
//     experience: [{ title: "", company: "", duration: "" }],
//     certifications: [""],
//     extras: [""],
//   });

//   const token = getToken();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleChange = (section, index, key, value) => {
//     const updated = [...form[section]];
//     updated[index] = { ...updated[index], [key]: value };
//     setForm({ ...form, [section]: updated });
//   };

//   const addField = (section, structure) => {
//     setForm({ ...form, [section]: [...form[section], structure] });
//   };

//   const removeField = (section, index) => {
//     const updated = [...form[section]];
//     updated.splice(index, 1);
//     setForm({ ...form, [section]: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/user/resume", form, { headers: { Authorization: `Bearer ${token}` } });
//       setLoading(false);
//       navigate("/templates");
//     } catch (err) {
//       setLoading(false);
//       alert(err.response?.data?.message || "Error saving resume.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Build Your Resume</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input placeholder="Role (e.g. Frontend Dev)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
//         <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//         <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
//         <textarea placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}></textarea>

//         <h4>Skills</h4>
//         {form.skills.map((s, i) => (
//           <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//             <input value={s} onChange={(e) => {
//               const skills = [...form.skills]; skills[i] = e.target.value; setForm({ ...form, skills });
//             }} />
//             <button type="button" onClick={() => removeField("skills", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("skills", "")}>+ Add Skill</button>

//         <h4>Education</h4>
//         {form.education.map((ed, i) => (
//           <div key={i} style={{ marginBottom: 8 }}>
//             <input placeholder="Degree" value={ed.degree} onChange={(e) => handleChange("education", i, "degree", e.target.value)} />
//             <input placeholder="School" value={ed.school} onChange={(e) => handleChange("education", i, "school", e.target.value)} />
//             <input placeholder="Year" value={ed.year} onChange={(e) => handleChange("education", i, "year", e.target.value)} />
//             <button type="button" onClick={() => removeField("education", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("education", { degree: "", school: "", year: "" })}>+ Add Education</button>

//         <h4>Projects</h4>
//         {form.projects.map((proj, i) => (
//           <div key={i} style={{ marginBottom: 8 }}>
//             <input placeholder="Title" value={proj.title} onChange={(e) => handleChange("projects", i, "title", e.target.value)} />
//             <input placeholder="Description" value={proj.description} onChange={(e) => handleChange("projects", i, "description", e.target.value)} />
//             <input placeholder="Link (optional)" value={proj.link} onChange={(e) => handleChange("projects", i, "link", e.target.value)} />
//             <button type="button" onClick={() => removeField("projects", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("projects", { title: "", description: "", link: "" })}>+ Add Project</button>

//         <h4>Experience</h4>
//         {form.experience.map((exp, i) => (
//           <div key={i} style={{ marginBottom: 8 }}>
//             <input placeholder="Job Title" value={exp.title} onChange={(e) => handleChange("experience", i, "title", e.target.value)} />
//             <input placeholder="Company" value={exp.company} onChange={(e) => handleChange("experience", i, "company", e.target.value)} />
//             <input placeholder="Duration" value={exp.duration} onChange={(e) => handleChange("experience", i, "duration", e.target.value)} />
//             <button type="button" onClick={() => removeField("experience", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("experience", { title: "", company: "", duration: "" })}>+ Add Experience</button>

//         <h4>Certifications</h4>
//         {form.certifications.map((c, i) => (
//           <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//             <input placeholder="Certificate Title" value={c} onChange={(e) => {
//               const certs = [...form.certifications]; certs[i] = e.target.value; setForm({ ...form, certifications: certs });
//             }} />
//             <button type="button" onClick={() => removeField("certifications", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("certifications", "")}>+ Add Certification</button>

//         <h4>Extra Curricular Activities</h4>
//         {form.extras.map((extra, i) => (
//           <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//             <input placeholder="Activity" value={extra} onChange={(e) => {
//               const extras = [...form.extras]; extras[i] = e.target.value; setForm({ ...form, extras });
//             }} />
//             <button type="button" onClick={() => removeField("extras", i)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addField("extras", "")}>+ Add Extra Activity</button>

//         <div style={{ marginTop: 16 }}>
//           <button type="submit" disabled={loading}>{loading ? <Spinner /> : "Save Resume"}</button>
//         </div>
//       </form>
//     </div>
//   );
// }










// // import React, { useState } from "react";
// // import "./ResumeForm.css";

// // export default function ResumeForm({ onSubmit }) {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     role: "",
// //     summary: "",
// //     contact: { email: "", phone: "", location: "", github: "", linkedin: "", website: "", photo: null },
// //     frontendSkills: [""],
// //     backendSkills: [""],
// //     tools: [""],
// //     programmingLanguages: [""],
// //     projects: [{ title: "", description: "", link: "", document: null, tags: [] }],
// //     education: [{ degree: "", school: "", year: "" }],
// //     experience: [{ title: "", company: "", duration: "", document: null }],
// //     certifications: [{ name: "", document: null }],
// //     resumeFile: null,
// //   });

// //   const handleChange = (e, section, index, field) => {
// //     const { name, value, files } = e.target;

// //     if (section) {
// //       let updated = [...formData[section]];
// //       updated[index][field] = files ? files[0] : value;
// //       setFormData({ ...formData, [section]: updated });
// //     } else if (name.includes("contact.")) {
// //       const key = name.split(".")[1];
// //       setFormData({
// //         ...formData,
// //         contact: { ...formData.contact, [key]: files ? files[0] : value },
// //       });
// //     } else {
// //       setFormData({ ...formData, [name]: files ? files[0] : value });
// //     }
// //   };

// //   const addField = (section, obj) => {
// //     setFormData({ ...formData, [section]: [...formData[section], obj] });
// //   };

// //   const removeField = (section, index) => {
// //     let updated = [...formData[section]];
// //     updated.splice(index, 1);
// //     setFormData({ ...formData, [section]: updated });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(formData);
// //   };

// //   return (
// //     <form className="resume-form" onSubmit={handleSubmit}>
// //       <h2>Portfolio Builder</h2>

// //       {/* Hero Info */}
// //       <label>Name</label>
// //       <input type="text" name="name" value={formData.name} onChange={handleChange} required />

// //       <label>Role</label>
// //       <input type="text" name="role" value={formData.role} onChange={handleChange} required />

// //       <label>Summary</label>
// //       <textarea name="summary" value={formData.summary} onChange={handleChange} />

// //       {/* Contact */}
// //       <h3>Contact Info</h3>
// //       <label>Email</label>
// //       <input type="email" name="contact.email" value={formData.contact.email} onChange={handleChange} required />

// //       <label>Phone</label>
// //       <input type="text" name="contact.phone" value={formData.contact.phone} onChange={handleChange} />

// //       <label>Location</label>
// //       <input type="text" name="contact.location" value={formData.contact.location} onChange={handleChange} />

// //       <label>Profile Photo</label>
// //       <input type="file" name="contact.photo" accept="image/*" onChange={handleChange} />

// //       <label>GitHub</label>
// //       <input type="url" name="contact.github" value={formData.contact.github} onChange={handleChange} />

// //       <label>LinkedIn</label>
// //       <input type="url" name="contact.linkedin" value={formData.contact.linkedin} onChange={handleChange} />

// //       <label>Website</label>
// //       <input type="url" name="contact.website" value={formData.contact.website} onChange={handleChange} />

// //       {/* Skills */}
// //       <h3>Skills</h3>

// //       {["frontendSkills", "backendSkills", "tools", "programmingLanguages"].map((section) => (
// //         <div key={section}>
// //           <h4>{section.replace(/([A-Z])/g, " $1")}</h4>
// //           {formData[section]?.map((s, i) => (
// //             <div key={i} className="skill-row">
// //               <input
// //                 type="text"
// //                 placeholder={`${section.replace(/([A-Z])/g, " $1").trim()} Skill`}
// //                 value={s}
// //                 onChange={(e) => {
// //                   let updated = [...formData[section]];
// //                   updated[i] = e.target.value;
// //                   setFormData({ ...formData, [section]: updated });
// //                 }}
// //               />
// //               <button type="button" className="remove-btn" onClick={() => removeField(section, i)}>
// //                 ✕
// //               </button>
// //             </div>
// //           ))}
// //           <button type="button" className="add-btn" onClick={() => setFormData({ ...formData, [section]: [...(formData[section] || []), ""] })}>
// //             + Add {section.replace(/([A-Z])/g, " $1").trim()} Skill
// //           </button>
// //         </div>
// //       ))}

// //       {/* Projects */}
// //       <h3>Projects</h3>
// //       {formData.projects.map((p, i) => (
// //         <div key={i} className="nested-section">
// //           <input type="text" placeholder="Title" value={p.title} onChange={(e) => handleChange(e, "projects", i, "title")} />
// //           <textarea placeholder="Description" value={p.description} onChange={(e) => handleChange(e, "projects", i, "description")} />
// //           <input type="url" placeholder="Link" value={p.link} onChange={(e) => handleChange(e, "projects", i, "link")} />
// //           <input
// //             type="text"
// //             placeholder="Tags (comma separated)"
// //             value={p.tags?.join(", ") || ""}
// //             onChange={(e) => {
// //               let updated = [...formData.projects];
// //               updated[i].tags = e.target.value.split(",").map(tag => tag.trim());
// //               setFormData({ ...formData, projects: updated });
// //             }}
// //           />
// //           <label>Project Document</label>
// //           <input type="file" onChange={(e) => handleChange(e, "projects", i, "document")} />
// //           <button type="button" className="remove-btn" onClick={() => removeField("projects", i)}>Remove Project</button>
// //         </div>
// //       ))}
// //       <button type="button" className="add-btn" onClick={() => addField("projects", { title: "", description: "", link: "", document: null, tags: [] })}>
// //         + Add Project
// //       </button>

// //       {/* Education */}
// //       <h3>Education</h3>
// //       {formData.education.map((ed, i) => (
// //         <div key={i} className="nested-section">
// //           <input type="text" placeholder="Degree" value={ed.degree} onChange={(e) => handleChange(e, "education", i, "degree")} />
// //           <input type="text" placeholder="School" value={ed.school} onChange={(e) => handleChange(e, "education", i, "school")} />
// //           <input type="text" placeholder="Year" value={ed.year} onChange={(e) => handleChange(e, "education", i, "year")} />
// //           <button type="button" className="remove-btn" onClick={() => removeField("education", i)}>Remove Education</button>
// //         </div>
// //       ))}
// //       <button type="button" className="add-btn" onClick={() => addField("education", { degree: "", school: "", year: "" })}>
// //         + Add Education
// //       </button>

// //       {/* Experience */}
// //       <h3>Experience</h3>
// //       {formData.experience.map((ex, i) => (
// //         <div key={i} className="nested-section">
// //           <input type="text" placeholder="Job Title" value={ex.title} onChange={(e) => handleChange(e, "experience", i, "title")} />
// //           <input type="text" placeholder="Company" value={ex.company} onChange={(e) => handleChange(e, "experience", i, "company")} />
// //           <input type="text" placeholder="Duration" value={ex.duration} onChange={(e) => handleChange(e, "experience", i, "duration")} />
// //           <label>Experience Document</label>
// //           <input type="file" onChange={(e) => handleChange(e, "experience", i, "document")} />
// //           <button type="button" className="remove-btn" onClick={() => removeField("experience", i)}>Remove Experience</button>
// //         </div>
// //       ))}
// //       <button type="button" className="add-btn" onClick={() => addField("experience", { title: "", company: "", duration: "", document: null })}>
// //         + Add Experience
// //       </button>

// //       {/* Certifications */}
// //       <h3>Certifications</h3>
// //       {formData.certifications.map((c, i) => (
// //         <div key={i} className="nested-section">
// //           <input
// //             type="text"
// //             placeholder="Certification Name"
// //             value={c.name}
// //             onChange={(e) => handleChange(e, "certifications", i, "name")}
// //           />
// //           <label>Certification Document</label>
// //           <input type="file" onChange={(e) => handleChange(e, "certifications", i, "document")} />
// //           <button type="button" className="remove-btn" onClick={() => removeField("certifications", i)}>Remove Certification</button>
// //         </div>
// //       ))}
// //       <button type="button" className="add-btn" onClick={() => addField("certifications", { name: "", document: null })}>
// //         + Add Certification
// //       </button>

// //       {/* Resume Upload */}
// //       <h3>Resume</h3>
// //       <input type="file" name="resumeFile" accept=".pdf,.doc,.docx" onChange={handleChange} required />

// //       <button type="submit" className="submit-btn">Save Portfolio</button>
// //     </form>
// //   );
// // }

// import React, { useState } from "react";
// import "./ResumeForm.css";

// export default function ResumeForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     summary: "",
//     contact: { email: "", phone: "", location: "", github: [""], linkedin: [""], website: "", photo: null },
//     frontendSkills: [""],
//     backendSkills: [""],
//     tools: [""],
//     programmingLanguages: [""],
//     projects: [{ title: "", description: "", link: "", document: null, tags: [] }],
//     education: [{ degree: "", school: "", year: "" }],
//     experience: [{ title: "", company: "", duration: "", document: null }],
//     certifications: [{ name: "", document: null }],
//     resumeFile: null,
//   });

//   // handle text/file input
//   const handleChange = (e, section, index, field) => {
//     const { name, value, files } = e.target;

//     if (section) {
//       let updated = [...formData[section]];
//       updated[index][field] = files ? files[0] : value;
//       setFormData({ ...formData, [section]: updated });
//     } else if (name.includes("contact.")) {
//       const key = name.split(".")[1];
//       setFormData({
//         ...formData,
//         contact: { ...formData.contact, [key]: files ? files[0] : value },
//       });
//     } else if (name === "resumeFile") {
//       setFormData({ ...formData, resumeFile: files ? files[0] : value });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const addField = (section, obj) => {
//     setFormData({ ...formData, [section]: [...formData[section], obj] });
//   };

//   const removeField = (section, index) => {
//     let updated = [...formData[section]];
//     updated.splice(index, 1);
//     setFormData({ ...formData, [section]: updated });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form className="resume-form" onSubmit={handleSubmit}>
//       <h2>Portfolio Builder</h2>

//       {/* Hero Info */}
//       <label>Name</label>
//       <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//       <label>Role</label>
//       <input type="text" name="role" value={formData.role} onChange={handleChange} required />

//       <label>Summary</label>
//       <textarea name="summary" value={formData.summary} onChange={handleChange} />

//       {/* Contact */}
//       <h3>Contact Info</h3>
//       <input type="email" name="contact.email" placeholder="Email" value={formData.contact.email} onChange={handleChange} required />
//       <input type="text" name="contact.phone" placeholder="Phone" value={formData.contact.phone} onChange={handleChange} />
//       <input type="text" name="contact.location" placeholder="Location" value={formData.contact.location} onChange={handleChange} />
//       <input type="url" name="contact.github" placeholder="GitHub" value={formData.contact.github} onChange={handleChange} />
//       <input type="url" name="contact.linkedin" placeholder="LinkedIn" value={formData.contact.linkedin} onChange={handleChange} />
//       <input type="url" name="contact.website" placeholder="Website" value={formData.contact.website} onChange={handleChange} />
//       <label>Profile Photo</label>
//       <input type="file" name="contact.photo" accept="image/*" onChange={handleChange} />

//       {/* Skills */}
//       <h3>Skills</h3>
//       {["frontendSkills", "BackendSkills", "Tools", "ProgrammingLanguages"].map((section) => (
//         <div key={section} className="nested-section">
//           <h4>{section.replace(/([A-Z])/g, " $1")}</h4>
//           {formData[section]?.map((s, i) => (
//             <div key={i} className="skill-row">
//               <input
//                 type="text"
//                 placeholder={`${section.replace(/([A-Z])/g, " $1").trim()} Skill`}
//                 value={s}
//                 onChange={(e) => {
//                   let updated = [...formData[section]];
//                   updated[i] = e.target.value;
//                   setFormData({ ...formData, [section]: updated });
//                 }}
//               />
//               <button type="button" className="remove-btn" onClick={() => removeField(section, i)}>✕</button>
//             </div>
//           ))}
//           <button type="button" className="add-btn" onClick={() => addField(section, "")}>
//             + Add Skill
//           </button>
//         </div>
//       ))}

//       {/* Projects */}
//       <h3>Projects</h3>
//       {formData.projects.map((p, i) => (
//         <div key={i} className="nested-section">
//           <input type="text" placeholder="Title" value={p.title} onChange={(e) => handleChange(e, "projects", i, "title")} />
//           <textarea placeholder="Description" value={p.description} onChange={(e) => handleChange(e, "projects", i, "description")} />
//           <input type="url" placeholder="Link" value={p.link} onChange={(e) => handleChange(e, "projects", i, "link")} />
//           <input
//             type="text"
//             placeholder="Tags (comma separated)"
//             value={p.tags?.join(", ") || ""}
//             onChange={(e) => {
//               let updated = [...formData.projects];
//               updated[i].tags = e.target.value ? e.target.value.split(",").map(tag => tag.trim()) : [];
//               setFormData({ ...formData, projects: updated });
//             }}
//           />
//           <label>Project Document</label>
//           <input type="file" onChange={(e) => handleChange(e, "projects", i, "document")} />
//           <button type="button" className="remove-btn" onClick={() => removeField("projects", i)}>Remove Project</button>
//         </div>
//       ))}
//       <button type="button" className="add-btn" onClick={() => addField("projects", { title: "", description: "", link: "", document: null, tags: [] })}>
//         + Add Project
//       </button>

//       {/* Education */}
//       <h3>Education</h3>
//       {formData.education.map((ed, i) => (
//         <div key={i} className="nested-section">
//           <input type="text" placeholder="Degree" value={ed.degree} onChange={(e) => handleChange(e, "education", i, "degree")} />
//           <input type="text" placeholder="School" value={ed.school} onChange={(e) => handleChange(e, "education", i, "school")} />
//           <input type="text" placeholder="Year" value={ed.year} onChange={(e) => handleChange(e, "education", i, "year")} />
//           <button type="button" className="remove-btn" onClick={() => removeField("education", i)}>Remove Education</button>
//         </div>
//       ))}
//       <button type="button" className="add-btn" onClick={() => addField("education", { degree: "", school: "", year: "" })}>
//         + Add Education
//       </button>

//       {/* Experience */}
//       <h3>Experience</h3>
//       {formData.experience.map((ex, i) => (
//         <div key={i} className="nested-section">
//           <input type="text" placeholder="Job Title" value={ex.title} onChange={(e) => handleChange(e, "experience", i, "title")} />
//           <input type="text" placeholder="Company" value={ex.company} onChange={(e) => handleChange(e, "experience", i, "company")} />
//           <input type="text" placeholder="Duration" value={ex.duration} onChange={(e) => handleChange(e, "experience", i, "duration")} />
//           <label>Experience Document</label>
//           <input type="file" onChange={(e) => handleChange(e, "experience", i, "document")} />
//           <button type="button" className="remove-btn" onClick={() => removeField("experience", i)}>Remove Experience</button>
//         </div>
//       ))}
//       <button type="button" className="add-btn" onClick={() => addField("experience", { title: "", company: "", duration: "", document: null })}>
//         + Add Experience
//       </button>

//       {/* Certifications */}
//       <h3>Certifications</h3>
//       {formData.certifications.map((c, i) => (
//         <div key={i} className="nested-section">
//           <input type="text" placeholder="Certification Name" value={c.name} onChange={(e) => handleChange(e, "certifications", i, "name")} />
//           <label>Certification Document</label>
//           <input type="file" onChange={(e) => handleChange(e, "certifications", i, "document")} />
//           <button type="button" className="remove-btn" onClick={() => removeField("certifications", i)}>Remove Certification</button>
//         </div>
//       ))}
//       <button type="button" className="add-btn" onClick={() => addField("certifications", { name: "", document: null })}>
//         + Add Certification
//       </button>

//       {/* Resume Upload */}
//       <h3>Resume</h3>
//       <input type="file" name="resumeFile" accept=".pdf,.doc,.docx" onChange={handleChange} />

//       <button type="submit" className="submit-btn">Save Portfolio</button>
//     </form>
//   );
// }


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
