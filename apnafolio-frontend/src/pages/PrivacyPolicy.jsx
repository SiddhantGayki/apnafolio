// import "../styles/legal.css";

// export default function PrivacyPolicy() {
//   return (
//     <div className="legal-page">
//     <div className="legal-container">
//       <h1>Privacy Policy</h1>
//       <p className="legal-date">Last updated: January 2026</p>

//       <p>
//         ApnaFolio ("we", "our", "us") respects your privacy and is committed to
//         protecting the personal information of users who access or use our
//         platform.
//       </p>

//       <h2>Information We Collect</h2>
//       <ul>
//         <li>Name, email address, username</li>
//         <li>Portfolio, resume, and professional details</li>
//         <li>Authentication information via Google OAuth</li>
//         <li>Payment status and selected templates</li>
//       </ul>

//       <h2>How We Use Your Information</h2>
//       <ul>
//         <li>To create, host, and manage your portfolio</li>
//         <li>To authenticate users securely</li>
//         <li>To improve platform performance and user experience</li>
//         <li>To provide support and service-related communication</li>
//       </ul>

//       <h2>Data Security</h2>
//       <p>
//         We implement industry-standard security measures to protect user data.
//         However, no method of transmission over the internet is 100% secure.
//       </p>

//       <h2>Third-Party Services</h2>
//       <p>
//         ApnaFolio uses trusted third-party services such as Google OAuth and
//         payment gateways. These services follow their own privacy policies.
//       </p>

//       <h2>Contact Us</h2>
//       <p>
//         For any questions regarding this Privacy Policy, contact us at:
//         <br />
//         <strong>support@apnafolio.in</strong>
//       </p>
//     </div>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import "../styles/IntroPage.css";
// import logo from "../assets/logo.png"
// import "../styles/legal.css";
// // import Navbar from "../components/Navbar2";
// // import Footer from "../components/Footer";

// export default function PrivacyPolicy() {
//   return (
//     <>
//       <nav className="navbar">
//               <div className="nav-logo">
//                 <img src="/logo.png" alt="ApnaFolio" className="logo-img" />
//               </div>
//               <div className="nav-menu">
//                 <Link to="/" className="menu-link">Home</Link>
//                 <Link to="/E-template" className="menu-link">Templates</Link>
//               <Link to="/privacy-policy" className="menu-link">Privacy Policy</Link>
//               <Link to="/terms" className="menu-link">Terms of Service</Link>
//                 <Link to="/login" className="login-btn">Login</Link>
//                 <Link to="/signup" className="register-btn">Get Started</Link>
//               </div>
//             </nav>

//       <div className="legal-page">
//         <div className="legal-container">
//           <h1>Privacy Policy</h1>
//           <p className="legal-date">Last updated: January 2026</p>

//           <p>
//             ApnaFolio ("we", "our", "us") respects your privacy and is committed
//             to protecting the personal information of users who access or use
//             our platform.
//           </p>

//           <h2>Information We Collect</h2>
//           <ul>
//             <li>Name, email address, username</li>
//             <li>Portfolio, resume, and professional details</li>
//             <li>Authentication via Google OAuth</li>
//             <li>Payment status and selected templates</li>
//           </ul>

//           <h2>How We Use Your Information</h2>
//           <ul>
//             <li>To create and host portfolios</li>
//             <li>To authenticate users securely</li>
//             <li>To improve platform experience</li>
//             <li>To provide support</li>
//           </ul>

//           <h2>Contact</h2>
//           <p>
//             support@apnafolio.in
//           </p>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="footer-bar">
//         <div className="footer-content">
//           <p>© {new Date().getFullYear()} ApnaFolio • Apni Pahchaan, ApnaFolio ke Saath</p>
//           <p className="brand">By SHiVYANT Technologies</p>
//         </div>
//       </footer>

//     </>
//   );
// }

import { Link } from "react-router-dom";
import "../styles/IntroPage.css";
import "../styles/legal.css";
import Navbar2 from "../components/Navbar2";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar2 />

      <div className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>
          <p className="legal-date">Last updated: January 2026</p>

          <p>
            ApnaFolio ("we", "our", "us") respects your privacy and is committed
            to protecting the personal information of users who access or use
            our platform.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Name, email address, username</li>
            <li>Portfolio, resume, and professional details</li>
            <li>Authentication via Google OAuth</li>
            <li>Payment status and selected templates</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To create and host portfolios</li>
            <li>To authenticate users securely</li>
            <li>To improve platform experience</li>
            <li>To provide support</li>
          </ul>

          <h2>Contact</h2>
          <p>
            <strong>support@apnafolio.in</strong>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* FOOTER COMPONENT (inline for now) */
function Footer() {
  return (
    <footer className="footer-bar">
      <p>
        © {new Date().getFullYear()} ApnaFolio • Apni Pahchaan, ApnaFolio ke Saath
      </p>
      <p className="brand">By SHiVYANT Technologies</p>

      <div style={{ marginTop: "10px" }}>
        <Link to="/privacy-policy" className="menu-link">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/terms" className="menu-link">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
