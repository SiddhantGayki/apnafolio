// src/pages/IntroPage.jsx
import { Link } from "react-router-dom";
import "../styles/IntroPage.css";

export default function IntroPage() {
  return (
    <div className="intro-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="ApnaFolio" className="logo" />
          {/* <span className="nav-title">ApnaFolio</span> */}
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/templateE" className="nav-link">Templates</Link>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn">Register</Link>
        </div>
      </nav>
      
        {/* <p className="hero-text">Apni Pahchaan, Apna<span>Folio</span> ke Saath</p> */}
      

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-text">Apni Pahchaan, Apna<span>Folio</span> ke Saath</p>
          <h1 className="hero-title">Build Your <span>Portfolio</span> in Minutes</h1>
          <p className="hero-subtext">
            Showcase your skills, experience & projects with stunning templates.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/templateE" className="btn btn-primary">Explore Templates</Link>
          </div>
        </div>
        {/* <div className="resume-preview">
          <h3>✨ Resume Preview</h3>
          <div className="resume-box">
            <div className="resume-header">
              <h2>John Doe</h2>
              <p>Frontend Developer</p>
            </div>
            <div className="resume-section">
              <h4>Skills</h4>
              <div className="skills">
                <span>React</span>
                <span>JavaScript</span>
                <span>CSS</span>
              </div>
            </div>
            <div className="resume-section">
              <h4>Projects</h4>
              <ul>
                <li>Portfolio Website</li>
                <li>Todo App</li>
                <li>Weather Dashboard</li>
              </ul>
            </div>
          </div>
        </div> */}

      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">⚡ Quick & Easy Builder</div>
        <div className="feature-card">🎨 Modern Templates</div>
        <div className="feature-card">📱 Mobile Friendly</div>
        <div className="feature-card">☁️ Cloud Save</div>
      </section>

      {/* Description Section */}
      <section className="description">
        <h1>🚀<span>Why Choose ApnaFolio?</span></h1>
        <p>
          ApnaFolio is your all-in-one portfolio and resume builder. Whether you are a student, fresher, 
          or working professional, you can design a stunning digital portfolio in just a few minutes. 
          With modern templates, customizable sections, and a clean dashboard — your skills and 
          achievements get the spotlight they deserve.
        </p>

        <div className="desc-highlights">
          <div className="desc-card">
            <h3>✨ No Coding Needed</h3>
            <p>Simple drag-and-drop builder for everyone.</p>
          </div>
          <div className="desc-card">
            <h3>🎨 Beautiful Templates</h3>
            <p>Designed for modern professionals.</p>
          </div>
          <div className="desc-card">
            <h3>📱 Responsive & Shareable</h3>
            <p>Works perfectly on mobile, tablet, and desktop.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Start your journey now🚀</h2>
        <Link to="/register" className="btn btn-primary">Create Your Portfolio</Link>
      </section>
    </div>
  );
}


// import { Link } from "react-router-dom";
// import "../styles/IntroPage.css";

// export default function IntroPage() {
//   return (
//     <div className="intro-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="nav-left">
//           <img src="/logo.png" alt="ApnaFolio" className="logo" />
//         </div>
//         <div className="nav-right">
//           <Link to="/" className="nav-link">Home</Link>
//           <Link to="/templates" className="nav-link">Templates</Link>
//           <Link to="/login" className="nav-btn">Login</Link>
//           <Link to="/register" className="nav-btn">Register</Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-left">
//           <p className="hero-text">Apni Pahchaan, Apna<span>Folio</span> ke Saath</p>
//           <h1 className="hero-title">Build Your <span>Portfolio</span> in Minutes</h1>
//           <p className="hero-subtext">
//             Showcase your skills, experience & projects with stunning templates.
//           </p>
//           <div className="hero-buttons">
//             <Link to="/register" className="btn btn-primary">Get Started</Link>
//             <Link to="/templates" className="btn btn-primary">Explore Templates</Link>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="features">
//         <div className="feature-card">⚡ Quick & Easy Builder</div>
//         <div className="feature-card">🎨 Modern Templates</div>
//         <div className="feature-card">📱 Mobile Friendly</div>
//         <div className="feature-card">☁️ Cloud Save</div>
//       </section>

//       {/* CTA */}
//       <section className="cta">
//         <h2>Start your journey now🚀</h2>
//         <Link to="/register" className="btn btn-primary">Create Your Portfolio</Link>
//       </section>
//     </div>
//   );
// }
