import { useState } from "react";
import { UserAPI, PaymentAPI } from "../utils/api";
import { loadRazorpay } from "../utils/payments"; 

const templates = [
  { id: "template1", name: "Modern Neon Dark", price: 299 },
  { id: "template2", name: "Gradient Glassmorphism", price: 399 },
  { id: "template3", name: "Split Hero Layout", price: 499 },
  { id: "template4", name: "Minimal Clean Theme", price: 599 },
  { id: "template5", name: "Premium Dark Glass", price: 699 },
  { id: "template6", name: "Diagonal Hero Light", price: 799 },
  { id: "template7", name: "Blob Background Portfolio", price: 899 },
  { id: "template8", name: "Smooth Scroll Light/Dark", price: 999 },
  { id: "template9", name: "Clean Resume Style", price: 1099 },
  { id: "template10", name: "Professional Gradient", price: 1199 },
  { id: "template11", name: "Dark Premium Motion", price: 1299 },
];

export default function TemplateSwitcher({ current }) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const switchTemplate = async (tpl) => {
    if (tpl.id === current) {
      setMsg("✅ Already using this template");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      // ✅ FREE TEMPLATE
      if (tpl.price === 0) {
        await UserAPI.switchTemplate(tpl.id);
        setMsg(`✅ Switched to ${tpl.name} (Free)`);
        return;
      }

      // ✅ PAID TEMPLATE FLOW
      // 1️⃣ Send RUPEES to backend (backend converts to paise)
      const orderRes = await PaymentAPI.createOrder(tpl.price);

      const order = orderRes.data.order;
      if (!order?.id) {
        throw new Error("Order creation failed");
      }

      // 2️⃣ Open Razorpay popup
      await loadRazorpay(order, tpl.id);

      setMsg(`✅ Switched to ${tpl.name} (Paid)`);
    } catch (err) {
      console.error("Template switch error:", err);
      setMsg("❌ Payment failed or cancelled");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-switcher">
      <p>
        <strong>Current Template:</strong> {current || "None"}
      </p>

      <div className="template-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <h4>{tpl.name}</h4>
            <p>{tpl.price === 0 ? "Free" : `₹${tpl.price}`}</p>

            <button
              onClick={() => switchTemplate(tpl)}
              disabled={loading || tpl.id === current}
            >
              {tpl.id === current ? "Active" : loading ? "Processing..." : "Switch"}
            </button>
            
          </div>
        ))}
      </div>

      {msg && <p className="status-msg">{msg}</p>}
    </div>
  );
}
