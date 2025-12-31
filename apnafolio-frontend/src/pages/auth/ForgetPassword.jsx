import { useState } from "react";
import api, { AuthAPI } from "../../utils/api";
import "../../styles/AuthPages.css";
import Lottie from "lottie-react";
import techAnimation from "../../assets/tech-animation.json";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await AuthAPI.forgotPassword(email);
      setMsg(res.data.message || "Password reset link sent!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
      <div className="auth-box">
        <div className="auth-left">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="auth-main-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
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
