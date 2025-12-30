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

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  const portfolioLink = `${window.location.origin}/portfolio/${auth.username}`;
  const currentTemplate = user?.selectedTemplate || "template1";

  return (
    <div className="user-dashboard">

      {/* HERO */}
      <div className="dash-hero">
        <div>
          <h2>Welcome, {user?.name || auth.username}</h2>
          <p>Your portfolio control center</p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>Views</span>
            <h3>{analytics.views || 0}</h3>
          </div>
          <div className="stat-card">
            <span>Template</span>
            <h3>{currentTemplate}</h3>
          </div>
          <div className="stat-card active">
            <span>Status</span>
            <h3>ACTIVE</h3>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="dash-grid">

        {/* PORTFOLIO LINK */}
        <div className="dash-card compact-link">
          <h3>Your Portfolio Link</h3>

          <div className="portfolio-row">
            <input value={portfolioLink} readOnly />

            <button
              className="btn-copy"
              onClick={() => navigator.clipboard.writeText(portfolioLink)}
            >
              Copy
            </button>

            <button
              className="btn-share"
              onClick={() => {
                if (navigator.share) navigator.share({ url: portfolioLink });
                else navigator.clipboard.writeText(portfolioLink);
              }}
            >
              Share
            </button>
          </div>

          {/* 🔥 DIRECT PREVIEW BUTTON */}
          <div className="portfolio-preview-action">
            <button
              className="btn-preview-main"
              onClick={() => window.open(portfolioLink, "_blank")}
            >
              👁 View Live Portfolio
            </button>
          </div>
        </div>

        {/* TEMPLATE SWITCHER */}
        <div className="dash-card">
          <h3>Template</h3>

          <div className="template-preview-wrapper">
            <TemplateSwitcher current={currentTemplate} />

            <div className="template-preview-overlay">
              <button
                onClick={() =>
                  window.open(
                    `${portfolioLink}?preview=true`,
                    "_blank"
                  )
                }
              >
                Preview Template
              </button>
            </div>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="dash-card">
          <h3>Analytics</h3>
          <AnalyticsChart views={analytics.views || 0} />
        </div>

        {/* PAYMENTS */}
        <div className="dash-card wide">
          <h3>Payments</h3>
          {user?.payments?.length ? (
            <ul>
              {user.payments.map((p, i) => (
                <li key={i}>
                  ₹{p.amount} • {p.status} •{" "}
                  {new Date(p.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No payments yet</p>
          )}
        </div>

        {/* ACTION */}
        <div className="dash-card wide action">
          <h3>Edit Resume</h3>
          <button onClick={() => navigate("/edit-resume")}>
            Edit Resume →
          </button>

        </div>
      </div>
    </div>
  );
}
