// import { useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { AuthAPI } from "../../utils/api";
// import "../../styles/AuthPages.css";

// export default function Verify() {
//   const [otp, setOtp] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await AuthAPI.verifyOtp({ email, otp });
//       setMsg("Email verified successfully!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Invalid OTP or Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
//       <div className="auth-box">
//         <div className="auth-left">
//           <h2>Verify Email</h2>
//           <p className="tagline">Check your email for the OTP</p>
//           <form onSubmit={handleVerify} className="auth-form">
//             <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//             <button type="submit" disabled={loading}>
//               {loading ? "Verifying..." : "Verify"}
//             </button>
//             {msg && <p className="error">{msg}</p>}
//             <p>Need to register? <Link to="/signup" className="register-link">Create Account</Link></p>
//           </form>
//         </div>
//         <div className="auth-right">
//           <video src="/education.mp4" autoPlay muted loop playsInline className="auth-video" />
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../../utils/api";   // ✅ आपल्या api.js मधून import कर

import "../../styles/AuthPages.css";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthAPI.verifyOtp({ email, otp });   // ✅ आता हे आपल्या backend API वर जाईल
      setMsg("Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid OTP or Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
      <div className="auth-box">
        <div className="auth-left">
          <h2>Verify Email</h2>
          <p className="tagline">Check your email for the OTP</p>
          <form onSubmit={handleVerify} className="auth-form">
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
            {msg && <p className="error">{msg}</p>}
            <p>
              Need to register?{" "}
              <Link to="/signup" className="register-link">
                Create Account
              </Link>
            </p>
          </form>
        </div>

        <div className="auth-right">
          <video
            src="/education.mp4"
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


// // import { useState } from "react";
// // import { useLocation, useNavigate, Link } from "react-router-dom";
// // import axios from "axios";
// // import "../../styles/AuthPages.css";

// // export default function Verify() {
// //   const [otp, setOtp] = useState("");
// //   const [msg, setMsg] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const email = location.state?.email;

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       await axios.post("/auth/verify", { email, otp });
// //       setMsg("Email verified successfully!");
// //       navigate("/login");
// //     } catch (err) {
// //       setMsg("Invalid OTP or Error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
// //       <div className="auth-box">
// //         <div className="auth-left">
// //           <h2>Verify Email</h2>
// //           <p className="tagline">Check your email for the OTP</p>
// //           <form onSubmit={handleVerify} className="auth-form">
// //             <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
// //             <button type="submit" disabled={loading}>
// //               {loading ? "Verifying..." : "Verify"}
// //             </button>
// //             {msg && <p className="error">{msg}</p>}
// //             <p>
// //               Need to register?{" "}
// //               <Link to="/signup" className="register-link">
// //                 Create Account
// //               </Link>
// //             </p>
// //           </form>
// //         </div>

// //         <div className="auth-right">
// //           <video
// //             src="/education.mp4"
// //             autoPlay
// //             muted
// //             loop
// //             playsInline
// //             className="auth-video"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
