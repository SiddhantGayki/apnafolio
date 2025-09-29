import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthAPI } from "../../utils/api";
import "../../styles/AuthPages.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await AuthAPI.resetPassword({ email, token, newPassword: password });
      setMsg("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
      <div className="auth-box">
        <div className="auth-left">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {msg && <p className="info">{msg}</p>}
          </form>
        </div>
        <div className="auth-right">
          <video
            src="/animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="auth-video"
          />
        </div>
      </div>
    </div>
  );
}
