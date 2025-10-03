import { useState } from "react";
import api from "../../utils/api";
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
    setMsg("Sending OTP...");
    try {
      await api.post("/auth/signup", form);
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
            <p>
              Already have an account?{" "}
              <Link to="/login" className="register-link">
                Login
              </Link>
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

// import { useState } from "react";
// import { AuthAPI } from "../../utils/api";
// import { useNavigate, Link } from "react-router-dom";
// import "../../styles/AuthPages.css";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await AuthAPI.signup(form);
//       setMsg("Signup successful! Check email for OTP.");
//       navigate("/verify", { state: { email: form.email } });
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setMsg("");
//   };

//   return (
//     <div className="auth-container">
//       <img src="/logo.png" alt="ApnaFolio" className="auth-top-logo" />
//       <div className="auth-box">
//         <div className="auth-left">
//           <h2>Create Account</h2>
//           <p className="tagline">Apni Pahchaan, ApnaFolio ke saath</p>
//           <form onSubmit={handleSubmit} className="auth-form">
//             <input name="name" placeholder="Full Name" onChange={handleChange} required />
//             <input name="username" placeholder="Username" onChange={handleChange} required />
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit" disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </button>
//             {msg && <p className="error">{msg}</p>}
//             <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
//           </form>
//         </div>
//         <div className="auth-right">
//           <video src="/animation.mp4" autoPlay muted loop playsInline className="auth-video" />
//         </div>
//       </div>
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
