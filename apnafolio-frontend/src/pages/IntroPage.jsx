import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import aiFlow from "../assets/ai-flow.json";
import "../styles/IntroPage.css";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

export default function IntroPage() {
  return (
    <>
    <div className="intro-container">
      {/* TECH BACKGROUND ELEMENTS */}
      <div className="bg-aura blue-glow"></div>
      <div className="bg-aura yellow-glow"></div>
      <div className="grid-lines"></div>

      {/* NAVBAR */}

      <Navbar2 />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-tagline">
            ✨ Apni Pahchaan, Apna<span>Folio</span> ke Saath
          </div>
          <h1 className="hero-main-title">
          Your Career Needs a <br />
            <span className="gradient-text">Digital Home.</span>
          </h1>
          <p className="hero-description">
            Ditch the old-school resumes. Create a stunning, high-performance 
            portfolio website that highlights your journey, projects, and 
            potential in the tech world.
          </p>
          <div className="hero-btns-group">
            <Link to="/signup" className="btn-main">Build My Portfolio — Starting at ₹499</Link>
            <Link to="/explore" className="btn-outline">Explore Themes</Link>
          </div>
          <div className="tech-stack-icons">
            <span1>Trusted by students, developers & professionals across India</span1>
          </div>
        </div>

        <div className="hero-right">
          <div className="lottie-container">
            <Lottie animationData={aiFlow} loop={true} className="main-lottie" />
            <div className="glass-card card-top">⚡ Ultra Fast Hosting</div>
            <div className="glass-card card-bottom">🛡️ SEO Optimized</div>
            <div className="glass-card card-mid1">💸 Low Cost</div>
            <div className="glass-card card-mid2">📊 Live Analytic</div>
          </div>
        </div>
      </section>
        
        {/* FEATURES BENTO GRID */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to <span>Stand Out.</span></h2>
          {/* <p>Professional, Fast, and Recruiter-Optimized portfolios for the modern developer.</p> */}
        </div>
        
        <div className="bento-grid">
          {/* LARGE CARD: SPEED & DEPLOYMENT */}
          <div className="bento-card large">
            <div className="icon-box">🚀</div>
            <h3>Instant Deployment & Speed</h3>
            <p>
              Your portfolio goes live in seconds. No terminal, no Git commands, no hassle. 
              <b> Just fill details and your website is ready  </b> — we handle the coding and global hosting for you.
            </p>
          </div>

          {/* HIGHLIGHT CARD: DESIGN & THEMES */}
          <div className="bento-card highlight">
            <div className="icon-box">💎</div>
            <h3>Premium UI Themes</h3>
            <p>
              Hand-crafted templates designed by industry experts. Choose from 11+ high-end layouts 
              to showcase your projects like a pro.
            </p>
          </div>

           {/* HIGHLIGHT CARD: DESIGN & THEMES */}
          <div className="bento-card highlight">
            <div className="icon-box">💵</div>
            <h3>Affordable To all</h3>
            <p>
              Starting from just ₹499, ApnaFolio offers premium portfolio websites at prices anyone can afford.
            </p>
          </div>

          {/* MEDIUM CARD: RECRUITER FOCUS */}
          <div className="bento-card medium">
            <div className="icon-box">🎯</div>
            <h3>Recruiter Friendly</h3>
            <p>
              Layouts optimized for readability. HRs and technical leads can find your 
              core skills and project links instantly.
            </p>
          </div>

          {/* NEW ADDITION: ANALYTICS (Optional if you want 4 cards) */}
          <div className="bento-card small">
            <div className="icon-box">📊</div>
            <h3>Live Analytics</h3>
            <p>
              Track visitors and project clicks to see how your portfolio is performing.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (REPLACED PRICING) */}
      <section className="process-section">
         <h2 className="section-title">Three Steps to <span>Success.</span></h2>
         <div className="process-grid">
            <div className="step">
               <span className="step-num">01</span>
               <h4>Add Content</h4>
               <p>Fill in your projects, skills, and experience easily.</p>
            </div>
            <div className="step">
               <span className="step-num">02</span>
               <h4>Choose Template</h4>
               <p>Pick from 11+ professional, responsive designs.</p>
            </div>
            <div className="step">
               <span className="step-num">03</span>
               <h4>Go Live</h4>
               <p>Hit publish and share your custom link with the world.</p>
            </div>
         </div>
      </section>
      <Footer />
    </div>
      </>
  );
}