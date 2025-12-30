
import React, { useState } from "react";
import templates from "./templatesData";
import "./TemplatesExplore.css";
import api from "../utils/api";
import { getToken, getUsername } from "../utils/auth";
import Spinner from "../components/Spinner";

export default function TemplateList({ allowBuy = true }) {
  const token = getToken();
  const [loading, setLoading] = useState(false);

  return (
    <div className="template-list-container">
        {/* Navbar */}
      {/* <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="ApnaFolio" className="logo" />

        </div>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/templateE" className="nav-link">Templates</Link>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </div>
      </nav> */}
      <h2>Choose Your Perfect Template</h2>
      {loading && <Spinner />}

      <div className="template-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <div className="template-preview">
              <iframe
                src={tpl.demoUrl}
                title={tpl.name}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                }}
              ></iframe>
            </div>

            <h3>{tpl.name}</h3>

            <div className="template-actions">
              <a
                href={tpl.demoUrl}
                target="_blank"
                className="btn btn-preview"
                rel="noreferrer"
              >
                👁 Preview
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

