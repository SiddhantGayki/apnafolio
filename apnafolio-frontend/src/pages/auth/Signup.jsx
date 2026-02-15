import { useState } from "react";
import { AuthAPI } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import GoogleOneTap from "../../components/auth/GoogleOneTap";
import GoogleButton from "../../components/auth/GoogleButton";
import "../../styles/AuthPages.css";
import Lottie from "lottie-react";
import techAnimation from "../../assets/tech-animation.json";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthAPI.signup(form);
      setMsg("Signup successful! Check email for OTP.");
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };


  return (
  <div className="auth-container">
    <div className="auth-bg-glow"></div>
    {/* <GoogleOneTap /> */}
    <Link to="/"><img src="/logo.png" alt="Logo" className="auth-top-logo" /></Link>
    <div className="auth-box">
      <div className="auth-left">
        <h2>Create Account</h2>
        <p className="tagline">Join the next generation of professionals.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {msg && <p className="error">{msg}</p>}
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="auth-main-btn" disabled={loading}>{loading ? "Initializing..." : "Register"}</button>
          <div className="divider"><span>OR</span></div>
          <GoogleButton />
          <p style={{marginTop: '20px', fontSize: '0.9rem'}}>Have an account? <Link to="/login" className="register-link">Login</Link></p>
        </form>
      </div>
      {/* <div className="auth-right">
        <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
      </div> */}
            <div className="auth-right">
        <Lottie animationData={techAnimation} loop={true} style={{ width: '80%' }} />
      </div>
    </div>
  </div>
);
}
