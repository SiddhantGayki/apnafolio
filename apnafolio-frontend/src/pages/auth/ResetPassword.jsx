import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthAPI } from "../../utils/api";
import "../../styles/AuthPages.css";
import Lottie from "lottie-react";
import techAnimation from "../../assets/tech-animation.json";

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email || ""; // forgot पासून email state ने पाठव
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await AuthAPI.resetPassword({ email, otp, newPassword: password });
      setMsg("✅ Password reset successful! Redirecting...");
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
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-main-btn" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {msg && <p className="info">{msg}</p>}
          </form>
        </div>
              <div className="auth-right">
  <Lottie animationData={techAnimation} loop={true} style={{ width: '80%' }} />
</div>
        {/* <div className="auth-right">
          <video
            src="/animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="auth-video"
          />
        </div> */}
      </div>
    </div>
  );
}
