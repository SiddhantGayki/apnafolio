// import React, { useState } from "react";
// import templates from "./templatesData";
// import { Link } from "react-router-dom";
// import "./TemplatesExplore.css";
// import Spinner from "../components/Spinner";

// export default function TemplateList() {
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="template-list-container">
//       {/* Background Tech Decor */}
//       <div className="tech-bg-grid"></div>
//       <div className="glow-orb blue-glow"></div>

//       <header className="template-header">
//         <div className="tech-badge">✨ Industry-Standard Designs</div>
//         <h2>Choose Your Perfect <span>Template</span></h2>
//         <p>Select a digital home that truly reflects your professional personality.</p>
//       </header>

//       {loading && <Spinner />}

//       <div className="template-grid">
//         {templates.map((tpl) => (
//           <div key={tpl.id} className="template-card-morph">
//             <div className="template-preview-frame">
//               {/* Badge for Type */}
//               <div className="category-tag">Premium</div>
              
//               <iframe
//                 src={tpl.demoUrl}
//                 title={tpl.name}
//                 className="morph-iframe"
//                 scrolling="no"
//               ></iframe>
              
//               {/* Floating Action Overlay */}
//               <div className="preview-overlay">
//                 <a href={tpl.demoUrl} target="_blank" rel="noreferrer" className="btn-icon">
//                    👁️ Live Preview
//                 </a>
//               </div>
//             </div>

//             <div className="template-info">
//               <h3>{tpl.name}</h3>
//               <div className="template-meta">
//                 <span>⚡ Optimized</span> • <span>📱 Mobile Ready</span>
//               </div>
              
//               <div className="template-actions-group">
//                 {/* <Link to={`/edit/${tpl.id}`} className="btn-primary-morph">
//                    Build with This
//                 </Link> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// // import React, { useState } from "react";
// // import templates from "./templatesData";
// // import "./TemplatesExplore.css";
// // import api from "../utils/api";
// // import { getToken, getUsername } from "../utils/auth";
// // import Spinner from "../components/Spinner";

// // export default function TemplateList({ allowBuy = true }) {
// //   const token = getToken();
// //   const [loading, setLoading] = useState(false);

// //   return (
// //     <div className="template-list-container">
// //         {/* Navbar */}
// //       {/* <nav className="navbar">
// //         <div className="nav-left">
// //           <img src="/logo.png" alt="ApnaFolio" className="logo" />

// //         </div>
// //         <div className="nav-right">
// //           <Link to="/" className="nav-link">Home</Link>
// //           <Link to="/templateE" className="nav-link">Templates</Link>
// //           <Link to="/login" className="nav-btn">Login</Link>
// //           <Link to="/register" className="nav-btn">Register</Link>
// //         </div>
// //       </nav> */}
// //       <h2>Choose Your Perfect Template</h2>
// //       {loading && <Spinner />}

// //       <div className="template-grid">
// //         {templates.map((tpl) => (
// //           <div key={tpl.id} className="template-card">
// //             <div className="template-preview">
// //               <iframe
// //                 src={tpl.demoUrl}
// //                 title={tpl.name}
// //                 style={{
// //                   width: "100%",
// //                   height: "100%",
// //                   border: "none",
// //                   borderRadius: "8px",
// //                 }}
// //               ></iframe>
// //             </div>

// //             <h3>{tpl.name}</h3>

// //             <div className="template-actions">
// //               <a
// //                 href={tpl.demoUrl}
// //                 target="_blank"
// //                 className="btn btn-preview"
// //                 rel="noreferrer"
// //               >
// //                 👁 Preview
// //               </a>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummyResume from "../constants/dummyResume";
import { UserAPI } from "../utils/api";

// ❌ Error Fix: 'TemplatesPreview.css' kara (tumchya folder madhe 's' aahe)
import "./TemplatesPreview.css"; 

// ... baki templates import same rahatil

export default function TemplatePreview() {
  const { templateId } = useParams();
  const [mode, setMode] = useState("demo"); 
  const [resume, setResume] = useState(dummyResume);
  const [loading, setLoading] = useState(false);

  // ... loadMyData logic same rahil

  return (
    <div className="preview-engine-container">
      {/* Control Bar: Hila top var fixed theva jyamule template d दिसायला अडथळा येणार नाही */}
      <div className="preview-controls">
        <button 
          className={mode === "demo" ? "active" : "btn"} 
          onClick={() => { setResume(dummyResume); setMode("demo"); }}
        >
          🧪 Demo Data
        </button>
        <button 
          className={mode === "real" ? "active" : "btn"} 
          onClick={loadMyData}
        >
          {loading ? "Syncing..." : "👤 Use My Data"}
        </button>
      </div>

      {/* Template Viewport: Yat Hover-Pop effect asel */}
      <div className="template-viewport">
        <div className="template-wrapper">
           {renderTemplate()}
        </div>
      </div>
    </div>
  );
}