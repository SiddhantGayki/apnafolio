// import { useEffect, useState } from "react";
// import ResumeForm from "./ResumeForm";
// import api from "../../utils/api";
// // import { uploadFile } from "../../utils/cloudinaryUpload";
// import Spinner from "../../components/Spinner";
// import { uploadFile } from "../../utils/s3Upload";

// export default function ResumeEditPage() {
//   const [resume, setResume] = useState(null);

//   // ✅ missing states added
//   const [saving, setSaving] = useState(false);
//   const [progress, setProgress] = useState("");

//   useEffect(() => {
//     api.get("/user/resume").then((res) => setResume(res.data));
//   }, []);

//   const saveSection = async (section, sectionData) => {
//     try {
//       setSaving(true);
//       setProgress(`Saving ${section}...`);

//       let payload = structuredClone(sectionData);

//       if (Array.isArray(payload)) {
//         for (const item of payload) {
//           if (item.document instanceof File) {
//             item.document = await uploadFile(item.document);
//           }
//         }
//       }

//       if (section === "resumeFile" && payload instanceof File) {
//         payload = await uploadFile(payload);
//       }

//       // await api.patch("/user/resume/section", {
//       //   section,
//       //   data: payload,
//       // });
//       await api.post("/user/resume", {
//   ...resume,
//   [section]: payload
// });


//       alert(`${section} saved`);
//     } catch (err) {
//       console.error("Edit save error:", err);
//       alert("Failed to save section");
//     } finally {
//       setSaving(false);
//       setProgress("");
//     }
//   };

//   if (!resume) {
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
        
//         <Spinner size={40} />
//         <p>Loading resume...</p>
//       </div>
//     );
//   }
// const handleFullSave = async (data) => {
//   await UserAPI.saveResume(data);
// };

//   return (
//     <>
//       {/* <ResumeForm
//         mode="edit"
//         initialData={resume}
//         onSectionSave={saveSection}
//       /> */}
//       <ResumeForm
//   mode="edit"
//   initialData={resume}
//   onSubmit={handleFullSave}
// />


//       {/* ✅ Saving overlay */}
//       {saving && (
//         <div className="saving-overlay">
//           <Spinner size={56} />
//           <p>{progress || "Saving... please wait"}</p>
//         </div>
//       )}
//     </>
//   );
// }






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "./ResumeForm";
import { UserAPI } from "../../utils/api";
import Spinner from "../../components/Spinner";
import { uploadFile } from "../../utils/s3Upload";

export default function ResumeEditPage() {
  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();

  // 🔥 Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await UserAPI.getResume();
        setResume(res.data);
      } catch (err) {
        console.error("Failed to load resume:", err);
      }
    };

    fetchResume();
  }, []);

  // 🔥 Full Save (Same logic as ResumePage)
  const handleSave = async (data) => {
    try {
      setSaving(true);
      setProgress("Preparing your portfolio...");

      // Deep copy
      const payload = {
        ...data,
        contact: { ...(data.contact || {}) },
        projects: (data.projects || []).map((p) => ({ ...p })),
        education: (data.education || []).map((e) => ({ ...e })),
        experience: (data.experience || []).map((x) => ({ ...x })),
        certifications: (data.certifications || []).map((c) => ({ ...c })),
      };

      // Upload profile photo
      if (payload.contact?.photo instanceof File) {
        setProgress("Uploading profile photo...");
        payload.contact.photo = await uploadFile(payload.contact.photo);
      }

      // Upload resume file
      if (payload.resumeFile instanceof File) {
        setProgress("Uploading resume file...");
        payload.resumeFile = await uploadFile(payload.resumeFile);
      }

      // Upload project documents
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

      // Upload experience documents
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

      // Upload certification documents
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

      // Clean empty skills
      payload.frontendSkills = payload.frontendSkills?.filter(Boolean) || [];
      payload.backendSkills = payload.backendSkills?.filter(Boolean) || [];
      payload.tools = payload.tools?.filter(Boolean) || [];
      payload.programmingLanguages = payload.programmingLanguages?.filter(Boolean) || [];

      // 🔥 Save to backend
      setProgress("Saving changes...");
      const res = await UserAPI.saveResume(payload);

      if (res?.data?.success) {
        alert("✅ Portfolio updated successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ Something went wrong while updating!");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update portfolio.");
    } finally {
      setSaving(false);
      setProgress("");
    }
  };

  // 🔄 Loading UI
  if (!resume) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner size={40} />
        <p>Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="resume-edit-page">
      <ResumeForm
        mode="edit"
        initialData={resume}
        onSubmit={handleSave}
      />

      {saving && (
        <div className="saving-overlay">
          <Spinner size={56} />
          <p>{progress || "Saving... please wait"}</p>
        </div>
      )}
    </div>
  );
}
