import React, { useState } from "react";
import templates from "./templatesData";
import "./TemplateList.css";
import api from "../utils/api";
import { getToken, getUsername } from "../utils/auth";
import Spinner from "../components/Spinner";

export default function TemplateList({ allowBuy = true }) {
  const token = getToken();
  const username = getUsername();
  const [loading, setLoading] = useState(false);
  // TemplateList.jsx
const handleBuy = async (templateId, price) => {
  setLoading(true);
  try {
    // create order in paise
    const res = await api.post("/payment/order", { amount: price * 100 });
    const { id, amount, currency } = res.data.order; // ✅ FIXED

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount,
      currency,
      name: "ApnaFolio",
      description: "Portfolio Template Purchase",
      order_id: id,
      handler: async function (response) {
        try {
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
          window.location.href = `/u/${username}`;
        } catch (err) {
          alert("Payment verification failed.");
          setLoading(false);
        }
      },
      theme: { color: "#121212" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Payment failed to initiate.");
    setLoading(false);
  }
};


  // const handleBuy = async (templateId, price) => {
  //   setLoading(true);
  //   try {
  //     // 1. Create order from backend (amount in paise)
  //     const res = await api.post(
  //       "/payment/order",
  //       { amount: price * 100 },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     const { order } = res.data; // ✅ backend returns { success, order }
  //     const { id, amount, currency } = order;

  //     // 2. Razorpay checkout options
  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY,
  //       amount,
  //       currency,
  //       name: "ApnaFolio",
  //       description: "Portfolio Template Purchase",
  //       order_id: id,
  //       handler: async function (response) {
  //         try {
  //           await api.post(
  //             "/payment/verify",
  //             {
  //               razorpay_payment_id: response.razorpay_payment_id,
  //               razorpay_order_id: response.razorpay_order_id,
  //               razorpay_signature: response.razorpay_signature,
  //               templateId,
  //               amount,
  //             },
  //             { headers: { Authorization: `Bearer ${token}` } }
  //           );

  //           window.location.href = `/u/${username}`;
  //         } catch (err) {
  //           console.error("Verify payment error:", err);
  //           alert("Payment verification failed.");
  //           setLoading(false);
  //         }
  //       },
  //       theme: { color: "#121212" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     alert("Payment failed to initiate.");
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="template-list-container">
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
            <p className="template-price">₹{tpl.price}</p>

            <ul className="template-features">
              {Array.isArray(tpl.features)
                ? tpl.features.map((f, i) => <li key={i}>• {f}</li>)
                : <li>{tpl.features}</li>}
            </ul>

            <div className="template-actions">
              <a
                href={tpl.demoUrl}
                target="_blank"
                className="btn btn-preview"
                rel="noreferrer"
              >
                👁 Preview
              </a>
              {allowBuy && (
                <button
                  onClick={() => handleBuy(tpl.id, tpl.price)}
                  className="btn btn-buy"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

