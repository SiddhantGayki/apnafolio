// // // src/pages/form/ResumePage.jsx
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; 
// // import ResumeForm from "./ResumeForm";
// // import { UserAPI } from "../../utils/api";
// // import { uploadFile } from "../../utils/cloudinaryUpload";

// // export default function ResumePage() {
// //   const [saving, setSaving] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSave = async (data) => {
// //     try {
// //       setSaving(true);

// //       console.log("👉 Token before save:", localStorage.getItem("token")); // debug

// //       // deep-ish copy
// //       const payload = {
// //         ...data,
// //         contact: { ...(data.contact || {}) },
// //         projects: (data.projects || []).map((p) => ({ ...p })),
// //         education: (data.education || []).map((e) => ({ ...e })),
// //         experience: (data.experience || []).map((x) => ({ ...x })),
// //         certifications: (data.certifications || []).map((c) => ({ ...c })),
// //       };

// //       // Upload files if present
// //       if (payload.contact?.photo && payload.contact.photo instanceof File) {
// //         payload.contact.photo = await uploadFile(payload.contact.photo);
// //       }
// //       if (payload.resumeFile && payload.resumeFile instanceof File) {
// //         payload.resumeFile = await uploadFile(payload.resumeFile);
// //       }

// //       for (let i = 0; i < (payload.projects || []).length; i++) {
// //         const doc = payload.projects[i].document;
// //         if (doc && doc instanceof File) {
// //           payload.projects[i].document = await uploadFile(doc);
// //         }
// //       }

// //       for (let i = 0; i < (payload.experience || []).length; i++) {
// //         const doc = payload.experience[i].document;
// //         if (doc && doc instanceof File) {
// //           payload.experience[i].document = await uploadFile(doc);
// //         }
// //       }

// //       for (let i = 0; i < (payload.certifications || []).length; i++) {
// //         const doc = payload.certifications[i].document;
// //         if (doc && doc instanceof File) {
// //           payload.certifications[i].document = await uploadFile(doc);
// //         }
// //       }

// //       // normalize arrays
// //       payload.frontendSkills = payload.frontendSkills?.filter(Boolean) || [];
// //       payload.backendSkills = payload.backendSkills?.filter(Boolean) || [];
// //       payload.tools = payload.tools?.filter(Boolean) || [];
// //       payload.programmingLanguages = payload.programmingLanguages?.filter(Boolean) || [];

// //       // final save call (axios interceptor will add token)
// //       const res = await UserAPI.saveResume(payload);
// //       if (res?.data?.success) {
// //         alert("✅ Portfolio saved successfully!");
// //         navigate("/templates");
// //       } else {
// //         alert("❌ Something went wrong while saving!");
// //       }
// //     } catch (err) {
// //       console.error("Save resume error:", err);
// //       const msg = err?.response?.data?.message || err.message || "Unknown error";
// //       alert(`❌ Failed to save portfolio: ${msg}`);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div className="resume-page">
// //       <ResumeForm onSubmit={handleSave} />
// //       {saving && <p>Saving... please wait</p>}
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ResumeForm from "./ResumeForm";
// import { UserAPI } from "../../utils/api";
// import { uploadFile } from "../../utils/cloudinaryUpload";

// export default function ResumePage() {
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const handleSave = async (data) => {
//     try {
//       setSaving(true);
//       console.log("👉 Token before save:", localStorage.getItem("token"));

//       // Deep copy
//       const payload = {
//         ...data,
//         contact: { ...(data.contact || {}) },
//         projects: (data.projects || []).map((p) => ({ ...p })),
//         education: (data.education || []).map((e) => ({ ...e })),
//         experience: (data.experience || []).map((x) => ({ ...x })),
//         certifications: (data.certifications || []).map((c) => ({ ...c })),
//       };

//       // Uploads
//       if (payload.contact?.photo instanceof File) {
//         payload.contact.photo = await uploadFile(payload.contact.photo);
//       }
//       if (payload.resumeFile instanceof File) {
//         payload.resumeFile = await uploadFile(payload.resumeFile);
//       }

//       // Parallel uploads for projects
//       await Promise.all(
//         payload.projects.map(async (p, i) => {
//           if (p.document instanceof File) {
//             payload.projects[i].document = await uploadFile(p.document);
//           }
//         })
//       );

//       // Parallel uploads for experience
//       await Promise.all(
//         payload.experience.map(async (ex, i) => {
//           if (ex.document instanceof File) {
//             payload.experience[i].document = await uploadFile(ex.document);
//           }
//         })
//       );

//       // Parallel uploads for certifications
//       await Promise.all(
//         payload.certifications.map(async (c, i) => {
//           if (c.document instanceof File) {
//             payload.certifications[i].document = await uploadFile(c.document);
//           }
//         })
//       );

//       // Normalize arrays
//       payload.frontendSkills = payload.frontendSkills?.filter(Boolean) || [];
//       payload.backendSkills = payload.backendSkills?.filter(Boolean) || [];
//       payload.tools = payload.tools?.filter(Boolean) || [];
//       payload.programmingLanguages = payload.programmingLanguages?.filter(Boolean) || [];

//       // Save to backend
//       const res = await UserAPI.saveResume(payload);

//       if (res?.data?.success) {
//         alert("✅ Portfolio saved successfully!");
//         navigate("/templates"); // ✅ redirect to TemplateList
//       } else {
//         alert("❌ Something went wrong while saving!");
//       }
//     } catch (err) {
//       console.error("Save resume error:", err);
//       alert("❌ Failed to save portfolio. Check console for details.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="resume-page">
//       <ResumeForm onSubmit={handleSave} />
//       {saving && <p>Saving... please wait</p>}
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "./ResumeForm";
import { UserAPI } from "../../utils/api";
import { uploadFile } from "../../utils/cloudinaryUpload";

export default function ResumePage() {
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(""); // ✅ progress message
  const navigate = useNavigate();

  const handleSave = async (data) => {
    try {
      setSaving(true);
      setProgress("Preparing your portfolio...");
      console.log("👉 Token before save:", localStorage.getItem("token"));

      // Deep copy
      const payload = {
        ...data,
        contact: { ...(data.contact || {}) },
        projects: (data.projects || []).map((p) => ({ ...p })),
        education: (data.education || []).map((e) => ({ ...e })),
        experience: (data.experience || []).map((x) => ({ ...x })),
        certifications: (data.certifications || []).map((c) => ({ ...c })),
      };

      // Uploads
      if (payload.contact?.photo instanceof File) {
        setProgress("Uploading profile photo...");
        payload.contact.photo = await uploadFile(payload.contact.photo);
      }
      if (payload.resumeFile instanceof File) {
        setProgress("Uploading resume file...");
        payload.resumeFile = await uploadFile(payload.resumeFile);
      }

      // Parallel uploads for projects
      if (payload.projects.some((p) => p.document instanceof File)) {
        setProgress("Uploading project documents...");
      }
      await Promise.all(
        payload.projects.map(async (p, i) => {
          if (p.document instanceof File) {
            payload.projects[i].document = await uploadFile(p.document);
          }
        })
      );

      // Parallel uploads for experience
      if (payload.experience.some((ex) => ex.document instanceof File)) {
        setProgress("Uploading experience documents...");
      }
      await Promise.all(
        payload.experience.map(async (ex, i) => {
          if (ex.document instanceof File) {
            payload.experience[i].document = await uploadFile(ex.document);
          }
        })
      );

      // Parallel uploads for certifications
      if (payload.certifications.some((c) => c.document instanceof File)) {
        setProgress("Uploading certification documents...");
      }
      await Promise.all(
        payload.certifications.map(async (c, i) => {
          if (c.document instanceof File) {
            payload.certifications[i].document = await uploadFile(c.document);
          }
        })
      );

      // Normalize arrays
      payload.frontendSkills = payload.frontendSkills?.filter(Boolean) || [];
      payload.backendSkills = payload.backendSkills?.filter(Boolean) || [];
      payload.tools = payload.tools?.filter(Boolean) || [];
      payload.programmingLanguages = payload.programmingLanguages?.filter(Boolean) || [];

      // Save to backend
      setProgress("Saving portfolio to server...");
      const res = await UserAPI.saveResume(payload);

      if (res?.data?.success) {
        alert("✅ Portfolio saved successfully!");
        navigate("/templates"); // ✅ redirect to TemplateList
      } else {
        alert("❌ Something went wrong while saving!");
      }
    } catch (err) {
      console.error("Save resume error:", err);
      alert("❌ Failed to save portfolio. Check console for details.");
    } finally {
      setSaving(false);
      setProgress("");
    }
  };

  return (
    <div className="resume-page">
      <ResumeForm onSubmit={handleSave} />
      {saving && (
        <div className="saving-overlay">
          <div className="spinner"></div>
          <p>{progress || "Saving... please wait"}</p>
        </div>
      )}
    </div>
  );
}
