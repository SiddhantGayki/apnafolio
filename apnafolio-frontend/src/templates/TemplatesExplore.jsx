
import React, { useState } from "react";
import templates from "./templatesData";
import "./TemplatesExplore.css";
import api from "../utils/api";
import { getToken, getUsername } from "../utils/auth";
import Spinner from "../components/Spinner";

export default function TemplateList({ allowBuy = true }) {
  const token = getToken();
  const username = getUsername();
  const [loading, setLoading] = useState(false);

  const handleBuy = async (templateId, price) => {
    setLoading(true);
    try {
      // 1. Create order from backend (amount in paise)
      const res = await api.post("/payment/order", { amount: price * 100 });

      const { id, amount, currency } = res.data; // Razorpay order object

      // 2. Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // from frontend .env
        amount,
        currency,
        name: "ApnaFolio",
        description: "Portfolio Template Purchase",
        order_id: id,
        handler: async function (response) {
          try {
            // 3. Verify payment with backend
            await api.post(
              "/payment/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                templateId,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // 4. Redirect to user portfolio after success
            window.location.href = `/u/${username}`;
          } catch (err) {
            console.error("Verify payment error:", err);
            alert("Payment verification failed.");
            setLoading(false);
          }
        },
        theme: { color: "#121212" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed to initiate.");
      setLoading(false);
    }
  };

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

