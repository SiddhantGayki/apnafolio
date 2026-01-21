import { Link } from "react-router-dom";
import "../styles/legal.css";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar2 />

      <div className="legal-page">
        <div className="legal-container">
          <h1>Terms of Service</h1>
          <p className="legal-date">Last updated: January 2026</p>

          <p>
            By accessing or using ApnaFolio, you agree to comply with and be bound
            by these Terms of Service.
          </p>

          <h2>User Responsibilities</h2>
          <ul>
            <li>You are responsible for the accuracy of information you provide</li>
            <li>You must not upload illegal or harmful content</li>
            <li>You are responsible for maintaining account confidentiality</li>
          </ul>

          <h2>Payments & Subscriptions</h2>
          <p>
            Payments made for templates or services are non-refundable unless
            explicitly stated otherwise.
          </p>

          <h2>Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms or misuse the platform.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            ApnaFolio shall not be liable for any indirect or consequential
            damages arising from the use of our services.
          </p>

          <h2>Governing Law</h2>
          <p>These terms shall be governed by the laws of India.</p>
        </div>
      </div>

      <Footer />
    </>
  );
}