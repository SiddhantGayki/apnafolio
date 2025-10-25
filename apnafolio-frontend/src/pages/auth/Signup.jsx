// // old
// import { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import "../../styles/AuthPages.css";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const isValidEmail = (email) => {
//     // simple regex
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleChange = (field) => (e) => {
//     setForm((p) => ({ ...p, [field]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");

//     // basic validation
//     if (!form.name.trim() || !form.username.trim() || !form.email.trim() || !form.password) {
//       setMsg("Please fill all required fields.");
//       return;
//     }
//     if (!isValidEmail(form.email.trim())) {
//       setMsg("Please enter a valid email address.");
//       return;
//     }
//     // optional: enforce password length
//     if (form.password.length < 6) {
//       setMsg("Password should be at least 6 characters.");
//       return;
//     }

//     setLoading(true);
//     setMsg("Sending OTP...");

//     try {
//       // confirm your api util's baseURL — use "/auth/signup" if api already prefixes "/api"
//       const res = await api.post("/auth/signup", {
//         name: form.name.trim(),
//         username: form.username.trim(),
//         email: form.email.trim(),
//         password: form.password,
//       });

//       // If backend returns success flag or status:
//       if (res?.data?.success || res.status === 200 || res.status === 201) {
//         setMsg("Signup successful! Check email for OTP.");
//         navigate("/verify", { state: { email: form.email.trim() } });
//       } else {
//         // fallback message from backend
//         setMsg(res?.data?.message || "Signup completed, check your email.");
//       }
//     } catch (err) {
//       // robust error handling
//       const serverMsg = err?.response?.data?.message;
//       if (serverMsg) {
//         setMsg(serverMsg);
//       } else if (err?.request) {
//         setMsg("No response from server. Check your network or server.");
//       } else {
//         setMsg("Signup failed. Try again.");
//       }
//       console.error("Signup error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <img src="/logo.png" alt="ApnaFolio" height="60" />
//       <h2>Create Account</h2>
//       <p className="tagline">Apni Pahchaan, ApnaFolio ke saath</p>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange("name")}
//         />
//         <input
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange("username")}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange("email")}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange("password")}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Please wait..." : "Register"}
//         </button>

//         <p className="msg">{msg}</p>
//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import api from "../../utils/api";
// // import { useNavigate, Link } from "react-router-dom";
// // import "../../styles/AuthPages.css";

// // export default function Signup() {
// //   const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
// //   const [msg, setMsg] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMsg("Sending OTP...");
// //     try {
// //       await api.post("/auth/signup", form);
// //       setMsg("Signup successful! Check email for OTP.");
// //       navigate("/verify", { state: { email: form.email } });
// //     } catch (err) {
// //       setMsg(err.response?.data?.message || "Signup failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     setMsg("");
// //   };

// //   return (
// //     <div className="auth-container">
// //       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
// //       <div className="auth-box">
// //         <div className="auth-left">
// //           <h2>Create Account</h2>
// //           <p className="tagline">Apni Pahchaan, ApnaFolio ke saath</p>
// //           <form onSubmit={handleSubmit} className="auth-form">
// //             <input name="name" placeholder="Full Name" onChange={handleChange} required />
// //             <input name="username" placeholder="Username" onChange={handleChange} required />
// //             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
// //             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
// //             <button type="submit" disabled={loading}>
// //               {loading ? "Registering..." : "Register"}
// //             </button>
// //             {msg && <p className="error">{msg}</p>}
// //             <p>
// //               Already have an account?{" "}
// //               <Link to="/login" className="register-link">
// //                 Login
// //               </Link>
// //             </p>
// //           </form>
// //         </div>

// //         <div className="auth-right">
// //           <video
// //             src="/animation.mp4"
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

import { useState } from "react";
import { AuthAPI } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AuthPages.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
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
      <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
      <div className="auth-box">
        <div className="auth-left">
          <h2>Create Account</h2>
          <p className="tagline">Apni Pahchaan, ApnaFolio ke saath</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {msg && <p className="error">{msg}</p>}
            <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
          </form>
        </div>
        <div className="auth-right">
          <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
        </div>
      </div>
    </div>
  );
}



// // // import { useState } from "react";
// // // import api from "../../utils/api";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import "../../styles/AuthPages.css";

// // // export default function Signup() {
// // //   const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
// // //   const [msg, setMsg] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMsg("Sending OTP...");
// // //     try {
// // //       await api.post("/auth/signup", form);
// // //       setMsg("Signup successful! Check email for OTP.");
// // //       navigate("/verify", { state: { email: form.email } });
// // //     } catch (err) {
// // //       setMsg(err.response?.data?.message || "Signup failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //     setMsg("");
// // //   };

// // //   return (
// // //     <div className="auth-container">
// // //       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
// // //       <div className="auth-box">
// // //         <div className="auth-left">
// // //           <h2>Create Account</h2>
// // //           <p className="tagline">Apni Pahchaan, ApnaFolio ke saath</p>
// // //           <form onSubmit={handleSubmit} className="auth-form">
// // //             <input name="name" placeholder="Full Name" onChange={handleChange} required />
// // //             <input name="username" placeholder="Username" onChange={handleChange} required />
// // //             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
// // //             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
// // //             <button type="submit" disabled={loading}>
// // //               {loading ? "Registering..." : "Register"}
// // //             </button>
// // //             {msg && <p className="error">{msg}</p>}
// // //             <p>
// // //               Already have an account?{" "}
// // //               <Link to="/login" className="register-link">
// // //                 Login
// // //               </Link>
// // //             </p>
// // //           </form>
// // //         </div>

// // //         <div className="auth-right">
// // //           <video
// // //             src="/animation.mp4"
// // //             autoPlay
// // //             muted
// // //             loop
// // //             playsInline
// // //             className="auth-video"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
