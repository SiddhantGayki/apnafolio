// src/components/AdminEditUserModal.jsx
import React, { useState, useEffect } from "react";
import api from "../utils/api";

export default function AdminEditUserModal({ user, onClose }) {
  // Guard: जर user नसेल तर काहीही दाखवू नये
  if (!user) return null;

  const [paid, setPaid] = useState(!!user.paid);
  const [selectedTemplate, setSelectedTemplate] = useState(user.selectedTemplate || "");
  const [isAdmin, setIsAdmin] = useState(!!user.isAdmin);
  const [saving, setSaving] = useState(false);

  // Sync when parent passes a new user object
  useEffect(() => {
    setPaid(!!user.paid);
    setSelectedTemplate(user.selectedTemplate || "");
    setIsAdmin(!!user.isAdmin);
  }, [user]);

  const templates = [
    { value: "", label: "- none -" },
    { value: "template1", label: "Template 1" },
    { value: "template2", label: "Template 2" },
    { value: "template3", label: "Template 3" },
    { value: "template4", label: "Template 4" },
    { value: "template5", label: "Template 5" },
    { value: "template6", label: "Template 6" },
    { value: "template7", label: "Template 7" },
    { value: "template8", label: "Template 8" },
    { value: "template9", label: "Template 9" },
    { value: "template10", label: "Template 10" },
    { value: "template11", label: "Template 11" },
  ];

  const save = async () => {
    setSaving(true);

    // Accept either _id or id just in case
    const userId = user._id || user.id;
    if (!userId) {
      alert("User id missing — cannot save.");
      setSaving(false);
      return;
    }

    const payload = {
      userId,
      paid: !!paid,
      selectedTemplate: selectedTemplate || "",
      isAdmin: !!isAdmin,
    };

    try {
      console.log("Admin update payload:", payload);
      const res = await api.post("/admin/update-user", payload);

      if (res?.data?.success) {
        alert("Saved");
        onClose(true);
      } else {
        // server responded but success flag false
        const msg = res?.data?.message || "Save failed";
        console.error("Server save failed:", res?.data);
        alert("Failed: " + msg);
      }
    } catch (err) {
      // network / auth / server error
      console.error("admin save err:", err.response?.data || err.message || err);
      const message = err.response?.data?.message || err.message || "Unknown error";
      alert("Error saving: " + message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Edit User</h3>
        <p><strong>{user.name || "—"}</strong> — {user.email}</p>

        <div className="form-row">
          <label>
            Paid:
            <select value={paid ? "true" : "false"} onChange={(e) => setPaid(e.target.value === "true")}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Template:
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
              {templates.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Admin:
            <select value={isAdmin ? "true" : "false"} onChange={(e) => setIsAdmin(e.target.value === "true")}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button onClick={() => onClose(false)} disabled={saving} className="primary-btn">Cancel</button>
          <button onClick={save} disabled={saving} className="primary-btn">{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import Spinner from "./Spinner";
// // import "./Admin.css";

// export default function AdminEditUserModal({ user, onClose }) {
//   if (!user) return null;

//   const [paid, setPaid] = useState(!!user.paid);
//   const [selectedTemplate, setSelectedTemplate] = useState(user.selectedTemplate || "");
//   const [isAdmin, setIsAdmin] = useState(!!user.isAdmin);
//   const [editCredits, setEditCredits] = useState(user.editCredits || 0);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     setPaid(!!user.paid);
//     setSelectedTemplate(user.selectedTemplate || "");
//     setIsAdmin(!!user.isAdmin);
//     setEditCredits(user.editCredits || 0);
//   }, [user]);

//   const save = async () => {
//     setSaving(true);

//     try {
//       const payload = {
//         userId: user._id,
//         paid,
//         selectedTemplate,
//         isAdmin,
//         editCredits
//       };

//       const res = await api.post("/admin/update-user", payload);

//       if (res?.data?.success) {
//         onClose(true);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="admin-modal-backdrop">
//       <div className="admin-modal-card">

//         <h2>User Settings</h2>
//         <p className="user-meta">
//           {user.name} • {user.email}
//         </p>

//         {/* Account Controls */}
//         <div className="admin-grid">

//           <div className="field">
//             <label>Paid Plan</label>
//             <select value={paid} onChange={(e) => setPaid(e.target.value === "true")}>
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>
//           </div>

//           <div className="field">
//             <label>Template</label>
//             <input
//               value={selectedTemplate}
//               onChange={(e) => setSelectedTemplate(e.target.value)}
//             />
//           </div>

//           <div className="field">
//             <label>Admin Role</label>
//             <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value === "true")}>
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </div>

//           <div className="field">
//             <label>Edit Credits</label>
//             <input
//               type="number"
//               value={editCredits}
//               onChange={(e) => setEditCredits(Number(e.target.value))}
//             />
//           </div>

//         </div>

//         {/* S3 STORAGE INFO */}
//         <div className="s3-section">
//           <h4>S3 Storage</h4>
//           <p><strong>Profile Photo:</strong> {user.contact?.photo || "Not uploaded"}</p>
//           <p><strong>Resume File:</strong> {user.resumeFile || "Not uploaded"}</p>
//           <p><strong>Project Docs:</strong> {user.projects?.length || 0}</p>
//         </div>

//         {/* Metadata */}
//         <div className="meta-section">
//           <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
//           <p>Views: {user.analytics?.views || 0}</p>
//         </div>

//         <div className="modal-actions">
//           <button onClick={() => onClose(false)}>Cancel</button>

//           <button onClick={save} disabled={saving} className="primary-btn">
//             {saving ? <Spinner size={18} inline /> : "Save Changes"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
