// // // src/pages/IntroPage.jsx
// // import { Link } from "react-router-dom";
// // import "../styles/IntroPage.css";

// // export default function IntroPage() {
// //   return (
// //     <div className="intro-container">
// //       {/* Navbar */}
// //       <nav className="navbar">
// //         <div className="nav-left">
// //           <img src="/logo.png" alt="ApnaFolio" className="logo" />
// //           {/* <span className="nav-title">ApnaFolio</span> */}
// //         </div>
// //         <div className="nav-right">
// //           <Link to="/" className="nav-link">Home</Link>
// //           <Link to="/templateE" className="nav-link">Templates</Link>
// //           <Link to="/login" className="nav-btn">Login</Link>
// //           <Link to="/signup" className="nav-btn">Register</Link>
// //         </div>
// //       </nav>
      
// //         {/* <p className="hero-text">Apni Pahchaan, Apna<span>Folio</span> ke Saath</p> */}
      

// //       {/* Hero Section */}
// //       <section className="hero">
// //         <div className="hero-left">
// //           <p className="hero-text">Apni Pahchaan, Apna<span>Folio</span> ke Saath</p>
// //           <h1 className="hero-title">Build Your <span>Portfolio</span> in Minutes</h1>
// //           <p className="hero-subtext">
// //             Showcase your skills, experience & projects with stunning templates.
// //           </p>
// //           <div className="hero-buttons">
// //             <Link to="/signup" className="btn btn-primary">Get Started</Link>
// //             <Link to="/templateE" className="btn btn-primary">Explore Templates</Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="features">
// //         <div className="feature-card">⚡ Quick & Easy Builder</div>
// //         <div className="feature-card">🎨 Modern Templates</div>
// //         <div className="feature-card">📱 Mobile Friendly</div>
// //         <div className="feature-card">☁️ Cloud Save</div>
// //       </section>

// //       {/* Description Section */}
// //       <section className="description">
// //         <h1>🚀<span>Why Choose ApnaFolio?</span></h1>
// //         <p>
// //           ApnaFolio is your all-in-one portfolio and resume builder. Whether you are a student, fresher, 
// //           or working professional, you can design a stunning digital portfolio in just a few minutes. 
// //           With modern templates, customizable sections, and a clean dashboard — your skills and 
// //           achievements get the spotlight they deserve.
// //         </p>

// //         <div className="desc-highlights">
// //           <div className="desc-card">
// //             <h3>✨ No Coding Needed</h3>
// //             <p>Simple drag-and-drop builder for everyone.</p>
// //           </div>
// //           <div className="desc-card">
// //             <h3>🎨 Beautiful Templates</h3>
// //             <p>Designed for modern professionals.</p>
// //           </div>
// //           <div className="desc-card">
// //             <h3>📱 Responsive & Shareable</h3>
// //             <p>Works perfectly on mobile, tablet, and desktop.</p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="cta">
// //         <h2>Start your journey now🚀</h2>
// //         <Link to="/signup" className="btn btn-primary">Create Your Portfolio</Link>
// //       </section>
// //     </div>
// //   );
// // }


// import { Link } from "react-router-dom";
// import "../styles/IntroPage.css";

// export default function IntroPage() {
//   return (
//     <div className="intro-container">

//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="nav-left">
//           <img src="/logo.png" alt="ApnaFolio" className="logo" />
//         </div>
//         <div className="nav-right">
//           <Link to="/" className="nav-link">Home</Link>
//           <Link to="/templateE" className="nav-link">Templates</Link>
//           <Link to="/login" className="nav-btn outline">Login</Link>
//           <Link to="/signup" className="nav-btn">Register</Link>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="hero">

//         {/* CIRCULAR AURA */}
//         <div className="aura blue"></div>
//         <div className="aura yellow"></div>

//         <div className="hero-content">
//           <h1>
//             Your <span>Portfolio</span>,<br />
//             Your Digital <span>Identity</span>
//           </h1>

//           <p className="hero-desc">
//             Build a clean, professional portfolio website using modern templates.
//             Simple, affordable, and designed for everyone.
//           </p>

//           <div className="hero-actions">
//             <Link to="/templateE" className="btn-secondary">
//               Explore Templates
//             </Link>
//             <Link to="/signup" className="btn-primary">
//               Get Started
//             </Link>
//           </div>

//           <p className="hero-price">
//             11 Premium Templates · ₹299 – ₹1299 · One-time payment
//           </p>
//         </div>
//       </section>

//       {/* DESCRIPTION */}
//       <section className="description">
//         <h2>Why <span>ApnaFolio</span>?</h2>

//         <p className="description-text">
//           ApnaFolio is built for students, freshers, and working professionals
//           who want a strong digital presence without complexity.
//           <br /><br />
//           Instead of juggling resumes, links, and profiles, ApnaFolio brings
//           everything together in one simple, shareable portfolio website.
//         </p>

//         <div className="desc-grid">
//           <div className="desc-card">
//             <h4>No Coding Required</h4>
//             <p>Just fill your details and publish.</p>
//           </div>
//           <div className="desc-card">
//             <h4>Recruiter Friendly</h4>
//             <p>Clean layout that highlights what matters.</p>
//           </div>
//           <div className="desc-card">
//             <h4>One Link Identity</h4>
//             <p>Your complete profile in one place.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta">
//         <h2>Create Your Portfolio Today</h2>
//         <p>Professional · Affordable · Easy</p>
//         <Link to="/signup" className="btn-primary big">
//           Start with ApnaFolio
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="footer">
//         © {new Date().getFullYear()} ApnaFolio · Apni Pahchaan, ApnaFolio ke Saath
//       </footer>

//     </div>
//   );
// }


import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import aiFlow from "../assets/ai-flow.json";
import "../styles/IntroPage.css";

export default function IntroPage() {
  return (
    <div className="intro-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="ApnaFolio" className="logo" />
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/templateE" className="nav-link">Templates</Link>
          <Link to="/login" className="nav-btn outline">Login</Link>
          <Link to="/signup" className="nav-btn">Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero hero-split">

        {/* LEFT CONTENT */}
        <div className="hero-left">
          <p className="hero-tagline">
            Apni Pahchaan, Apna<span>Folio</span> ke Saath
          </p>

          <h1 className="hero-title">
            Build Your <span>Portfolio</span><br />
            Like a Modern Professional
          </h1>

          <p className="hero-desc">
            Create a clean, professional portfolio website that truly represents
            you. Simple to build, affordable to own, and designed for students,
            freshers, and professionals.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
            <Link to="/templateE" className="btn-secondary">Explore Templates</Link>
          </div>

          <p className="hero-price">
            11 Premium Templates · ₹299 – ₹1299 · One-time payment
          </p>
        </div>

        {/* RIGHT – AI LOTTIE ACTIVITY */}
        <div className="hero-right">
          <Lottie
            animationData={aiFlow}
            loop
            autoplay
            className="hero-lottie"
          />
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="description">
        <h2>Why <span>ApnaFolio</span>?</h2>

        <p className="description-text">
          Most people struggle to present themselves professionally online.
          Resumes get ignored, links are scattered, and profiles feel incomplete.
          <br /><br />
          ApnaFolio solves this by giving you one clean portfolio website
          that brings everything together — your skills, projects, experience,
          and achievements — in a format recruiters actually like.
        </p>

        <div className="desc-grid">
          <div className="desc-card">
            <h4>No Coding Required</h4>
            <p>Fill a simple form and your portfolio is ready.</p>
          </div>
          <div className="desc-card">
            <h4>Designed for Recruiters</h4>
            <p>Clean layouts that highlight what matters.</p>
          </div>
          <div className="desc-card">
            <h4>Affordable for Everyone</h4>
            <p>Premium templates starting at ₹299.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Create Your Digital Identity Today</h2>
        <p>Professional · Affordable · Easy to use</p>
        <Link to="/signup" className="btn-primary big">
          Create My Portfolio
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} ApnaFolio · Apni Pahchaan, ApnaFolio ke Saath
      </footer>
    </div>
  );
}
