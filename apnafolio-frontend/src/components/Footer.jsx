import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./footer.css";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-top">

        {/* LEFT: BRAND + SOCIAL */}
        <div className="footer-brand">
                  <Link to="/" className="logo-wrap">
                    <img src={logo} alt="ApnaFolio Logo" className="logo-img" />
                  </Link>
          {/* <h3>ApnaFolio</h3> */}
          <p>Apni Pahchaan, ApnaFolio ke Saath</p>

          <div className="social-icons">
            <a href="https://facebook.com/YOUR_ID" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/YOUR_ID" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/shivyant.technologies" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/shivyant-technologies" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* CENTER: LINKS */}
        <div className="footer-links">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
            </div>
            <div className="footer-links">
          <h4>Legal</h4>
          <Link to="/privacy-policy" className="menu-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="menu-link">
            Terms of Service
          </Link>
        </div>

        {/* RIGHT: CONTACT / CTA */}
        {/* <div className="footer-contact">
          <h4>Stay Connected</h4>
          <p>support@apnafolio.in</p>
          <p>Mon–Sat · 10AM – 7PM IST</p>
        </div> */}
        <div className="footer-contact">
  <h4>Contact & Support</h4>

  <p className="contact-purpose">
    For portfolio support, payments & edits
  </p>

  <p className="contact-email">
    <a href="mailto:apnafolio9009@gmail.com" className="menu-link">
    apnafolio9009@gmail.com
    </a>
  </p>

  <p className="support-time">
    Mon–Sat · 10AM – 7PM IST
  </p>

  <p className="response-time">
    Response within 24 working hours
  </p>
</div>


      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ApnaFolio • Apni Pahchaan, ApnaFolio ke Saath
        </p>
        <p className="brandf">By SHiVYANT Technologies</p>
      </div>

    </footer>
  );
}
