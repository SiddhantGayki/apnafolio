// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { setAuth } from "../../utils/auth";
import GoogleOneTap from "../../components/auth/GoogleOneTap";
import GoogleButton from "../../components/auth/GoogleButton";
import "../../styles/AuthPages.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      if (!user.isVerified) {
        setMsg("⚠️ Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      setAuth({ token, username: user.username });

      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/form");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg(
        err.response?.data?.message ||
          "Invalid credentials or not verified."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Google One Tap auto popup */}
      <GoogleOneTap />

      <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />

      <div className="auth-box">
        <div className="auth-left">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="auth-form">
            {msg && <p className="error">{msg}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            <GoogleButton />

            <p>
              New here?{" "}
              <Link to="/signup" className="register-link">
                Create Account
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="register-link">
                Forgot Password?
              </Link>
            </p>
            <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "8px" }}>
              Or just continue with your Google account – One Tap popup will
              appear at the top.
            </p>
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


// // src/pages/auth/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../utils/api";
// import { setAuth } from "../../utils/auth";
// import "../../styles/AuthPages.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setMsg("");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/login", form);
//       const { token, user } = res.data;

//       if (!user.isVerified) {
//         setMsg("⚠️ Please verify your email before logging in.");
//         setLoading(false);
//         return;
//       }

//       // store token + username consistently
//       setAuth({ token, username: user.username });

//       if (user.isAdmin) {
//         navigate("/admin");
//       } else {
//         navigate("/form");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setMsg(err.response?.data?.message || "Invalid credentials or not verified.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />

//       <div className="auth-box">
//         <div className="auth-left">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin} className="auth-form">
//             {msg && <p className="error">{msg}</p>}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit" disabled={loading}>
//               {loading ? "Signing in..." : "Login"}
//             </button>

//             <p>
//               New here? <Link to="/signup" className="register-link">Create Account</Link>
//             </p>
//             <p>
//               <Link to="/forgot-password" className="register-link">Forgot Password?</Link>
//             </p>
//           </form>
//         </div>

//         <div className="auth-right">
//           <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthAPI } from "../../utils/api";
// import { setAuth } from "../../utils/auth";
// import "../../styles/AuthPages.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setMsg("");
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await AuthAPI.login(form);
//       const { token, user } = res.data;

//       if (!user.isVerified) {
//         setMsg("⚠️ Please verify your email before logging in.");
//         setLoading(false);
//         return;
//       }

//       setAuth({ token, username: user.username });

//       if (user.isAdmin) {
//         navigate("/admin");
//       } else {
//         navigate("/form");
//       }
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Invalid credentials or not verified.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />

//       <div className="auth-box">
//         <div className="auth-left">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin} className="auth-form">
//             {msg && <p className="error">{msg}</p>}
//             <input type="email" name="email" placeholder="Email"
//               value={form.email} onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password"
//               value={form.password} onChange={handleChange} required />
//             <button type="submit" disabled={loading}>
//               {loading ? "Signing in..." : "Login"}
//             </button>
//             <p>New here? <Link to="/signup" className="register-link">Create Account</Link></p>
//             <p><Link to="/forgot-password" className="register-link">Forgot Password?</Link></p>
//           </form>
//         </div>
//         <div className="auth-right">
//           <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
//         </div>
//       </div>
//     </div>
//   );
// }


// // // src/pages/auth/Login.jsx
// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import api from "../../utils/api";
// // import { setAuth } from "../../utils/auth";
// // import "../../styles/AuthPages.css";

// // export default function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [msg, setMsg] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     setMsg("");
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const res = await api.post("/auth/login", form);
// //       const { token, user } = res.data;

// //       if (!user.isVerified) {
// //         setMsg("⚠️ Please verify your email before logging in.");
// //         setLoading(false);
// //         return;
// //       }

// //       // store token + username consistently
// //       setAuth({ token, username: user.username });

// //       if (user.isAdmin) {
// //         navigate("/admin");
// //       } else {
// //         navigate("/form");
// //       }
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setMsg(err.response?.data?.message || "Invalid credentials or not verified.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />

// //       <div className="auth-box">
// //         <div className="auth-left">
// //           <h2>Login</h2>
// //           <form onSubmit={handleLogin} className="auth-form">
// //             {msg && <p className="error">{msg}</p>}

// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={form.password}
// //               onChange={handleChange}
// //               required
// //             />

// //             <button type="submit" disabled={loading}>
// //               {loading ? "Signing in..." : "Login"}
// //             </button>

// //             <p>
// //               New here? <Link to="/register" className="register-link">Create Account</Link>
// //             </p>
// //             <p>
// //               <Link to="/forgot-password" className="register-link">Forgot Password?</Link>
// //             </p>
// //           </form>
// //         </div>

// //         <div className="auth-right">
// //           <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
