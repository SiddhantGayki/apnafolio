// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import TemplateSwitcher from "../../components/TemplateSwitcher";
// import AnalyticsChart from "../../components/AnalyticsChart";
// import { getAuth } from "../../utils/auth";
// import "../../styles/Dashboard.css";

// export default function UserDashboard() {
//   const [user, setUser] = useState(null);
//   const [analytics, setAnalytics] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const auth = getAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!auth?.token) {
//       setError("You must be logged in");
//       setLoading(false);
//       return;
//     }

//     api.get("/user/dashboard")
//       .then((res) => {
//         setUser(res.data.user);
//         setAnalytics(res.data.analytics || {});
//       })
//       .catch(() => setError("Failed to load dashboard"))
//       .finally(() => setLoading(false));
//   }, [auth?.token]);

//   if (loading) return <p>Loading dashboard...</p>;
//   if (error) return <p className="error">{error}</p>;

//     const portfolioLink = `${window.location.origin}/portfolio/${user.username}`;
//   // const portfolioLink = `${window.location.origin}/portfolio/${auth.username}`;
//   const currentTemplate = user?.selectedTemplate || "template1";

//   return (
//     <div className="user-dashboard">

//       {/* HERO */}
//       <div className="dash-hero">
//         <div>
//           <h2>Welcome, {user?.name || user.username}</h2>
//           <p>Your portfolio control center</p>
//         </div>

//         <div className="hero-stats">
//           <div className="stat-card">
//             <span>Views</span>
//             <h3>{analytics.views || 0}</h3>
//           </div>
//           <div className="stat-card">
//             <span>Template</span>
//             <h3>{currentTemplate}</h3>
//           </div>
//           <div className="stat-card active">
//             <span>Status</span>
//             <h3>ACTIVE</h3>
//           </div>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="dash-grid">

//         {/* PORTFOLIO LINK */}
//         <div className="dash-card compact-link">
//           <h3>Your Portfolio Link</h3>

//           <div className="portfolio-row">
//             <input value={portfolioLink} readOnly />
//             <div className="btn-c-s">

//             <button
//               className="btn-copy"
//               onClick={() => navigator.clipboard.writeText(portfolioLink)}
//             >
//               Copy
//             </button>

//             <button
//               className="btn-share"
//               onClick={() => {
//                 if (navigator.share) navigator.share({ url: portfolioLink });
//                 else navigator.clipboard.writeText(portfolioLink);
//               }}
//             >
//               Share
//             </button>
//             </div>
//           </div>

//           {/* 🔥 DIRECT PREVIEW BUTTON */}
//           <div className="portfolio-preview-action">
//             <button
//               className="btn-preview-main"
//               onClick={() => window.open(portfolioLink, "_blank")}
//             >
//               👁 View Live Portfolio
//             </button>
//           </div>
//         </div>

        

//         {/* ANALYTICS */}
//         <div className="dash-card">
//           <h3>Analytics</h3>
//           <AnalyticsChart views={analytics.views || 0} />
//         </div>

//         {/* PAYMENTS */}
//         {/* <div className="dash-card wide">
//           <h3>Payments</h3>
//           {user?.payments?.length ? (
//             <ul>
//               {user.payments.map((p, i) => (
//                 <li key={i}>
//                   ₹{p.amount} • {p.status} •{" "}
//                   {new Date(p.date).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No payments yet</p>
//           )}
//         </div> */}

//         {/* TEMPLATE SWITCHER */}
//         <div className="dash-card">
//           <h3>Template</h3>

//           <div className="template-preview-wrapper">
//             <TemplateSwitcher current={currentTemplate} />
//           </div>
//         </div>

//         {/* ACTION */}
//         <div className="dash-card wide action">
//           <h3>Edit Resume</h3>
//           <p>Update your details to stay ahead of the competition.</p>
//           <button className="btn-edit" onClick={() => navigate("/edit-resume")}>
//             Edit Resume →
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import TemplateSwitcher from "../../components/TemplateSwitcher";
import AnalyticsChart from "../../components/AnalyticsChart";
import { getAuth } from "../../utils/auth";
import "../../styles/Dashboard.css";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // Popup state

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    api.get("/user/dashboard")
      .then((res) => {
        setUser(res.data.user);
        setAnalytics(res.data.analytics || {});
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // 2 sec nantar popup vanish hoil
  };

  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Building your Command Center...</p>
    </div>
  );

  if (error) return (
    <div className="error-screen">
      <div className="error-box">{error}</div>
    </div>
  );

  const portfolioLink = `${window.location.origin}/portfolio/${user?.username}`;
  const currentTemplate = user?.selectedTemplate || "template1";

  return (
    <div className="user-dashboard">
      {/* Background Glows (ApnaFolio Theme) */}
      <div className="bg-glow blue"></div>
      <div className="bg-glow yellow"></div>

      {/* Toast Notification */}
      {copySuccess && <div className="copy-popup">✅ Portfolio Link Copied!</div>}

      {/* HERO SECTION */}
      <header className="dash-hero">
        <div className="hero-text">
          <span className="tag-badge">Premium Control Center</span>
          <h2>Welcome, <span>{user?.name || user?.username}</span></h2>
          <p>Your portfolio control center</p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="label">Views</span>
            <h3>{analytics.views || 0}</h3>
          </div>
          <div className="stat-card">
            <span className="label">Template</span>
            <h3>{currentTemplate}</h3>
          </div>
          <div className="stat-card active-status">
            <span className="label">Status</span>
            <h3>ACTIVE</h3>
            <div className="pulse-dot"></div>
          </div>
        </div>
      </header>

      {/* BENTO GRID */}
      <div className="dash-grid">
        
        {/* PORTFOLIO LINK CARD */}
        <div className="dash-card compact-link highlight-card">
          <div className="card-header-icon">🔗</div>
          <h3>Your Portfolio Link</h3>
          <div className="portfolio-row">
            <input value={portfolioLink} readOnly />
            <div className="btn-c-s">
              <button className="btn-copy" onClick={() => handleCopy(portfolioLink)}>Copy</button>
              <button className="btn-share" onClick={() => {
                if (navigator.share) navigator.share({ url: portfolioLink });
                else handleCopy(portfolioLink);
              }}>Share</button>
            </div>
          </div>
          <button className="btn-preview-main" onClick={() => window.open(portfolioLink, "_blank")}>
            👁 View Live Portfolio
          </button>
        </div>

        {/* ANALYTICS CHART */}
        <div className="dash-card chart-card">
          <div className="card-header-icon">📈</div>
          <h3>Visitor Trends</h3>
          <div className="chart-wrapper">
            <AnalyticsChart views={analytics.views || 0} />
          </div>
        </div>

        {/* TEMPLATE MARKETPLACE (Full Width) */}
        <div className="dash-card wide switcher-card">
          <div className="card-header-icon">🎨</div>
          <h3>Template Marketplace</h3>
          <div className="template-preview-wrapper">
            <TemplateSwitcher current={currentTemplate} />
          </div>
        </div>

        {/* ACTION CARD (Full Width) */}
        <div className="dash-card wide action-card">
          <div className="action-flex">
            <div>
              <h3>Update Professional Details</h3>
              <p>Keep your resume up to date to attract more opportunities.</p>
            </div>
            <button className="btn-edit" onClick={() => navigate("/edit-resume")}>
              Edit Resume →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}