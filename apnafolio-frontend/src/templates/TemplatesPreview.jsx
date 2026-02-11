import { useState } from "react";
import { useParams } from "react-router-dom";
import dummyResume from "../constants/dummyResume";
import { UserAPI } from "../utils/api";
import "./TemplatesPreview.css";

// ✅ NEW
import LoginRequiredModal from "../components/LoginRequiredModal";

// Template Imports
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";
import Template7 from "../templates/Template7";
import Template8 from "../templates/Template8";
import Template9 from "../templates/Template9";
import Template10 from "../templates/Template10";
import Template11 from "../templates/Template11";
// import Template12 from "../templates/Template12";

export default function TemplatePreview() {
  const { templateId } = useParams();

  const [mode, setMode] = useState("demo");
  const [resume, setResume] = useState(dummyResume);
  const [loading, setLoading] = useState(false);

  // ✅ popup control
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const loadMyData = async () => {
    try {
      setLoading(true);
      const res = await UserAPI.getDashboard();
      setResume(res.data.user.resume || {});
      setMode("real");
    } catch (err) {
      // ❌ alert हटवला
      setShowLoginPopup(true); // ✅ popup दाखव
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case "template1": return <Template1 data={resume} />;
      case "template2": return <Template2 data={resume} />;
      case "template3": return <Template3 data={resume} />;
      case "template4": return <Template4 data={resume} />;
      case "template5": return <Template5 data={resume} />;
      case "template6": return <Template6 data={resume} />;
      case "template7": return <Template7 data={resume} />;
      case "template8": return <Template8 data={resume} />;
      case "template9": return <Template9 data={resume} />;
      case "template10": return <Template10 data={resume} />;
      case "template11": return <Template11 data={resume} />;
      // case "template12": return <Template12 data={resume} />;
      default:
        return <div className="not-found"><h2>Template Not Found</h2></div>;
    }
  };

  return (
    <div className="preview-engine-container">
      {/* 🛠️ CONTROL BAR */}
      <div className="preview-controls">
        <div className="control-group">
          <button
            className={`control-btn ${mode === "demo" ? "active" : ""}`}
            onClick={() => {
              setResume(dummyResume);
              setMode("demo");
            }}
          >
            🧪 Demo Data
          </button>

          <button
            className={`control-btn ${mode === "real" ? "active" : ""}`}
            onClick={loadMyData}
            disabled={loading}
          >
            {loading ? "⏳ Syncing..." : "👤 Use My Data"}
          </button>
        </div>

        <div className="status-indicator">
          Mode: <span className={mode === "real" ? "live" : "demo-tag"}>
            {mode.toUpperCase()}
          </span>
        </div>
      </div>

      {/* 📄 TEMPLATE */}
      <div className="template-viewport">
        {renderTemplate()}
      </div>

      {/* ✅ LOGIN POPUP */}
      <LoginRequiredModal
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
}
