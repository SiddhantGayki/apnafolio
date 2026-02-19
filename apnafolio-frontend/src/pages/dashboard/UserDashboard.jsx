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
//   const [copySuccess, setCopySuccess] = useState(false); // Popup state

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

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000); // 2 sec nantar popup vanish hoil
//   };

//   if (loading) return (
//     <div className="loader-container">
//       <div className="spinner"></div>
//       <p>Building your Command Center...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="error-screen">
//       <div className="error-box">{error}</div>
//     </div>
//   );

//   const portfolioLink = `${window.location.origin}/portfolio/${user?.username}`;
//   const currentTemplate = user?.selectedTemplate || "template1";

//   return (
//     <div className="user-dashboard">
//       {/* Background Glows (ApnaFolio Theme) */}
//       <div className="bg-glow blue"></div>
//       <div className="bg-glow yellow"></div>

//       {/* Toast Notification */}
//       {copySuccess && <div className="copy-popup">✅ Portfolio Link Copied!</div>}

//       {/* HERO SECTION */}
//       <header className="dash-hero">
//         <div className="hero-text">
//           <span className="tag-badge">Premium Control Center</span>
//           <h2>Welcome, <span>{user?.name || user?.username}</span></h2>
//           <p>Your portfolio control center</p>
//         </div>

//         <div className="hero-stats">
//           <div className="stat-card">
//             <span className="label">Views</span>
//             <h3>{analytics.views || 0}</h3>
//           </div>
//           <div className="stat-card">
//             <span className="label">Template</span>
//             <h3>{currentTemplate}</h3>
//           </div>
//           <div className="stat-card active-status">
//             <span className="label">Status</span>
//             <h3>ACTIVE</h3>
//             <div className="pulse-dot"></div>
//           </div>
//         </div>
//       </header>

//       {/* BENTO GRID */}
//       <div className="dash-grid">
        
//         {/* PORTFOLIO LINK CARD */}
//         <div className="dash-card compact-link highlight-card">
//           <div className="card-header-icon">🔗</div>
//           <h3>Your Portfolio Link</h3>
//           <div className="portfolio-row">
//             <input value={portfolioLink} readOnly />
//             <div className="btn-c-s">
//               <button className="btn-copy" onClick={() => handleCopy(portfolioLink)}>Copy</button>
//               <button className="btn-share" onClick={() => {
//                 if (navigator.share) navigator.share({ url: portfolioLink });
//                 else handleCopy(portfolioLink);
//               }}>Share</button>
//             </div>
//           </div>
//           <button className="btn-preview-main" onClick={() => window.open(portfolioLink, "_blank")}>
//             👁 View Live Portfolio
//           </button>
//         </div>

//         {/* ANALYTICS CHART */}
//         <div className="dash-card chart-card">
//           <div className="card-header-icon">📈</div>
//           <h3>Visitor Trends</h3>
//           <div className="chart-wrapper">
//             {/* <AnalyticsChart views={analytics.views || 0} /> */}
//             <AnalyticsChart data={analytics?.last7Days} />

//           </div>
//         </div>

//         {/* TEMPLATE MARKETPLACE (Full Width) */}
//         <div className="dash-card wide switcher-card">
//           <div className="card-header-icon">🎨</div>
//           <h3>Template Marketplace</h3>
//           <div className="template-preview-wrapper">
//             <TemplateSwitcher current={currentTemplate} />
//           </div>
//         </div>

//         {/* ACTION CARD (Full Width) */}
//         <div className="dash-card wide action-card">
//           <div className="action-flex">
//             <div>
//               <h3>Update Professional Details</h3>
//               <p>Keep your resume up to date to attract more opportunities.</p>
//             </div>
//             <button className="btn-edit" onClick={() => navigate("/edit-resume")}>
//               Edit Resume →
//             </button>
//           </div>
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
// import CreditPurchaseModal from "../../components/CreditPurchaseModel";
import CreditPurchaseModal from "../../components/CreditPurchaseModal";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // Popup state
  const [showCreditModal, setShowCreditModal] = useState(false);

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
  const totalCredits =
  (user?.freeEditCredits || 0) +
  (user?.paidEditCredits || 0);

// const daysLeft = user?.planExpiry
//   ? Math.max(
//       0,
//       Math.ceil(
//         (new Date(user.planExpiry) - new Date()) /
//           (1000 * 60 * 60 * 24)
//       )
//     )
//   : 0;

const expiryDate = user?.planExpiry
  ? new Date(user.planExpiry)
  : null;

const daysLeft = expiryDate
  ? Math.max(
      0,
      Math.ceil(
        (expiryDate.getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    )
  : 0;

const formattedExpiry = expiryDate
  ? expiryDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "N/A";

const isExpired = daysLeft <= 0;

  return (
   <> <div className="user-dashboard">
      
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
            <h3>{analytics?.totalViews}</h3>
          </div>
          <div className="stat-card">
            <span className="label">Template</span>
            <h3>{currentTemplate}</h3>
          </div>
          <div className="stat-card active-status">
            <span className="label">Status</span>
            {/* <h3>ACTIVE</h3> */}
            <h3>
              {user?.isBlocked || isExpired
                ? "EXPIRED"
                : "ACTIVE"}
            </h3>

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

       
        {/* <div className="dash-card compact-link">
            <div className="card-header-icon">💎</div>
            <h3>Plan & Credits</h3>

            <div className="credit-row">
              <p>Free Credits</p>
              <strong>{user?.freeEditCredits || 0}</strong>
            </div>

            <div className="credit-row">
              <p>Paid Credits</p>
              <strong>{user?.paidEditCredits || 0}</strong>
            </div>

            <div className="credit-row">
              <p>Total Credits</p>
              <strong>{totalCredits}</strong>
            </div>

            <div className="credit-row">
              <p>Plan Expiry Date</p>
              <strong>{formattedExpiry}</strong>
            </div>

            <div className="credit-row">
              <p>Status</p>
              <strong style={{ color: isExpired ? "#ff4d4f" : "#22c55e" }}>
                {isExpired ? "Expired" : `${daysLeft} days left`}
              </strong>
            </div>

          </div>
          <div className="dash-card compact-link">
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              
          <button
            className="btn-buy"
            onClick={() => setShowCreditModal(true)}
          >
            Buy Credits
          </button>
                <CreditPurchaseModal
            open={showCreditModal}
            onClose={() => setShowCreditModal(false)}
          />
              
              {isExpired && (
                <button
                  className="btn-renew"
                  onClick={() => navigate("/templates")}
                >
                  Renew Plan
                </button>
              )}
            </div>
          </div> */}

          <div className="dash-card compact-link data">
            <div className="card-header-icon">💎</div>
            <h3>Plan & Credits</h3>

            <div className="credit-row">
              <p>Free Credits</p>
              <strong>{user?.freeEditCredits || 0}</strong>
            </div>

            <div className="credit-row">
              <p>Paid Credits</p>
              <strong>{user?.paidEditCredits || 0}</strong>
            </div>

            <div className="credit-row">
              <p>Total Credits</p>
              <strong>{totalCredits}</strong>
            </div>

            <div className="credit-row">
              <p>Plan Expiry</p>
              <strong>{formattedExpiry}</strong>
            </div>

            <div className="credit-row">
              <p>Status</p>
              <strong style={{ color: isExpired ? "#ff4d4f" : "#22c55e" }}>
                {isExpired ? "Expired" : `${daysLeft} days left`}
              </strong>
            </div>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button
                className="btn-buy"
                onClick={() => setShowCreditModal(true)}
              >
                Buy Credits
              </button>

              {isExpired && (
                <button
                  className="btn-renew"
                  onClick={() => navigate("/templates")}
                >
                  Renew Plan
                </button>
              )}
            </div>
          </div>


 {/* ANALYTICS CHART */}
        {/* <div className="dash-card chart-card"> */}
<div className="dash-card wide switcher-card">
          <div className="card-header-icon">📈</div>
          <h3>Visitor Trends</h3>
          <div className="chart-wrapper">
            {/* <AnalyticsChart views={analytics.views || 0} /> */}
            {/* <AnalyticsChart data={analytics?.last7Days} />
             */}
             <AnalyticsChart
  data={analytics?.last7Days}
  totalViews={analytics?.totalViews}
  weeklyViews={analytics?.weeklyViews}
  monthlyViews={analytics?.monthlyViews}
  growth={analytics?.growth}
/>


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
  <CreditPurchaseModal
    open={showCreditModal}
    onClose={() => setShowCreditModal(false)}
  />
</>    
  
  );
}