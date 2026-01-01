import { useEffect, useState } from "react";
import ResumeForm from "./ResumeForm";
import api from "../../utils/api";
import { uploadFile } from "../../utils/cloudinaryUpload";
import Spinner from "../../components/Spinner";

export default function ResumeEditPage() {
  const [resume, setResume] = useState(null);

  // ✅ missing states added
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    api.get("/user/resume").then((res) => setResume(res.data));
  }, []);

  const saveSection = async (section, sectionData) => {
    try {
      setSaving(true);
      setProgress(`Saving ${section}...`);

      let payload = structuredClone(sectionData);

      if (Array.isArray(payload)) {
        for (const item of payload) {
          if (item.document instanceof File) {
            item.document = await uploadFile(item.document);
          }
        }
      }

      if (section === "resumeFile" && payload instanceof File) {
        payload = await uploadFile(payload);
      }

      await api.patch("/user/resume/section", {
        section,
        data: payload,
      });

      alert(`${section} saved`);
    } catch (err) {
      console.error("Edit save error:", err);
      alert("Failed to save section");
    } finally {
      setSaving(false);
      setProgress("");
    }
  };

  if (!resume) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner size={40} />
        <p>Loading resume...</p>
      </div>
    );
  }

  return (
    <>
      <ResumeForm
        mode="edit"
        initialData={resume}
        onSectionSave={saveSection}
      />

      {/* ✅ Saving overlay */}
      {saving && (
        <div className="saving-overlay">
          <Spinner size={56} />
          <p>{progress || "Saving... please wait"}</p>
        </div>
      )}
    </>
  );
}



// import { useEffect, useState } from "react";
// import ResumeForm from "./ResumeForm";
// import api from "../../utils/api";
// import { uploadFile } from "../../utils/cloudinaryUpload";
// import Spinner from "../../components/Spinner";

// export default function ResumeEditPage() {
//   const [resume, setResume] = useState(null);

//   useEffect(() => {
//     api.get("/user/resume").then((res) => setResume(res.data));
//   }, []);

//   const saveSection = async (section, sectionData) => {
//     let payload = structuredClone(sectionData);

//     if (Array.isArray(payload)) {
//       for (const item of payload) {
//         if (item.document instanceof File)
//           item.document = await uploadFile(item.document);
//       }
//     }

//     if (section === "resumeFile" && payload instanceof File) {
//       payload = await uploadFile(payload);
//     }

//     await api.patch("/user/resume/section", {
//       section,
//       data: payload,
//     });

//     alert(`${section} saved`);
//   };

//   if (!resume) return <p>Loading...</p>;

//   return (
//     <ResumeForm
//       mode="edit"
//       initialData={resume}
//       onSectionSave={saveSection}
//     />
//           {saving && (
//       <div className="saving-overlay">
//         <Spinner size={48} />
//         <p>{progress || "Saving... please wait"}</p>
//       </div>
//     )}
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { uploadFile } from "../../utils/cloudinaryUpload";

// export default function ResumeEditForm() {
//   const [resume, setResume] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     api.get("/user/resume").then((res) => setResume(res.data));
//   }, []);

//   const saveSection = async (section) => {
//     try {
//       setSaving(true);
//       const payload = structuredClone(resume[section]);

//       if (Array.isArray(payload)) {
//         for (const item of payload) {
//           if (item.document instanceof File) {
//             item.document = await uploadFile(item.document);
//           }
//         }
//       }

//       await api.patch("/user/resume/section", { section, data: payload });
//       alert(`${section} saved`);
//     } catch {
//       alert("Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!resume) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Edit Resume</h2>

//       <h3>Experience</h3>
//       {resume.experience.map((ex, i) => (
//         <div key={i}>
//           <input
//             value={ex.title}
//             onChange={(e) => {
//               const arr = [...resume.experience];
//               arr[i].title = e.target.value;
//               setResume({ ...resume, experience: arr });
//             }}
//           />
//           {typeof ex.document === "string" && (
//             <button onClick={() => {
//               const arr = [...resume.experience];
//               arr[i].document = null;
//               setResume({ ...resume, experience: arr });
//             }}>
//               Delete Doc
//             </button>
//           )}
//           <input type="file" onChange={(e) => {
//             const arr = [...resume.experience];
//             arr[i].document = e.target.files[0];
//             setResume({ ...resume, experience: arr });
//           }} />
//         </div>
//       ))}

//       <button disabled={saving} onClick={() => saveSection("experience")}>
//         Save Experience
//       </button>
//     </div>
//   );
// }

// // import { useEffect, useState } from "react";
// // import ResumeForm from "./ResumeForm";
// // import api from "../../utils/api";
// // import { uploadFile } from "../../utils/cloudinaryUpload";
// // import { useNavigate } from "react-router-dom";

// // export default function EditResume() {
// //   const [data, setData] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     api.get("/user/profile").then((res) => setData(res.data));
// //   }, []);

// //   const handleUpdate = async (formData) => {
// //     const payload = structuredClone(formData);

// //     if (payload.contact.photo instanceof File) {
// //       payload.contact.photoUrl = await uploadFile(payload.contact.photo);
// //     }
// //     delete payload.contact.photo;

// //     if (payload.resumeFile instanceof File) {
// //       payload.resumeFileUrl = await uploadFile(payload.resumeFile);
// //     }
// //     delete payload.resumeFile;

// //     await api.put("/user/profile", payload);
// //     alert("✅ Updated successfully");
// //     navigate("/dashboard");
// //   };

// //   if (!data) return <p>Loading...</p>;

// //   return <ResumeForm initialData={data} onSubmit={handleUpdate} />;
// // }
