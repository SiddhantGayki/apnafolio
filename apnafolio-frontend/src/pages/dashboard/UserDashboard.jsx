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

  return (
    <div className="user-dashboard">
      <h2>Welcome {user?.name || auth.username}</h2>

      {/* Portfolio Link */}
      <div className="dash-card">
        <h3>Portfolio Link</h3>
        <input
          value={`${window.location.origin}/portfolio/${auth.username}`}
          readOnly
          onClick={(e) => {
            navigator.clipboard.writeText(e.target.value);
            alert("Copied to clipboard!");
          }}
        />
      </div>

      {/* Template Management */}
      <div className="dash-card">
        <h3>Template Management</h3>
        <TemplateSwitcher current={user?.selectedTemplate} />
      </div>

      {/* Analytics */}
      <div className="dash-card">
        <h3>Analytics</h3>
        <AnalyticsChart views={analytics.views || 0} />
        <p>Total Views: {analytics.views || 0}</p>
        {analytics.lastViewedAt && (
          <p>Last Viewed: {new Date(analytics.lastViewedAt).toLocaleString()}</p>
        )}
      </div>

      {/* Payments History */}
      <div className="dash-card">
        <h3>Payments</h3>
        {user?.payments?.length > 0 ? (
          <ul>
            {user.payments.map((p, i) => (
              <li key={i}>
                {p.amount} INR •{" "}
                {new Date(p.date).toLocaleDateString()} • {p.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No payments yet</p>
        )}
      </div>

      {/* Edit Resume */}
      <div className="dash-card">
        <h3>Edit Resume</h3>
        <button onClick={() => navigate("/form")}>
          Go to Resume Form
        </button>
      </div>
    </div>
  );
}
