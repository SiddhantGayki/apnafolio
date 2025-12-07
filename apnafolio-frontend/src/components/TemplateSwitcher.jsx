// src/components/TemplateSwitcher.jsx
import { useState } from "react";
import { UserAPI, PaymentAPI } from "../utils/api";
import { loadRazorpay } from "../utils/payments";

const templates = [
  // { id: "template1", name: "Classic Portfolio", price: 0 },
  // { id: "template2", name: "Modern Grid", price: 299 },
  // { id: "template3", name: "Dark Elegance", price: 399 },
  // { id: "template4", name: "Split Hero", price: 499 },
  // { id: "template5", name: "Minimalist Resume", price: 299 },
  // { id: "template6", name: "Creative Showcase", price: 399 },
  // { id: "template7", name: "Animated Pro", price: 599 },
  // { id: "template8", name: "Techy Vibes", price: 499 },
  // { id: "template9", name: "Elegant Cards", price: 399 },
  // { id: "template10", name: "Bold Typography", price: 299 },
  // { id: "template11", name: "Visual Showcase", price: 699 },
    {
    id: "template1",
    name: "Modern Neon Dark",
    price: 299
  },
  {
    id: "template2",
    name: "Gradient Glassmorphism",
    price: 399
  },
  {
    id: "template3",
    name: "Split Hero Layout",
    price: 499
  },
  {
    id: "template4",
    name: "Minimal Clean Theme",
    price: 599
  },
  {
    id: "template5",
    name: "Premium Dark Glass",
    price: 699
  },
  {
    id: "template6",
    name: "Diagonal Hero Light",
    price: 799
  },
  {
    id: "template7",
    name: "Blob Background Portfolio",
    price: 899
  },
  {
    id: "template8",
    name: "Smooth Scroll Light/Dark",
    price: 999
  },
  {
    id: "template9",
    name: "Clean Resume Style",
    price: 1099
  {
    id: "template10",
    name: "Professional Gradient",
    price: 1199
  }
  {
    id: "template11",
    name: "Dark Premium Motion",
    price: 1299
  }

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
      if (tpl.price === 0) {
        await UserAPI.switchTemplate(tpl.id);
        setMsg(`✅ Switched to ${tpl.name} (Free)`);
      } else {
        // convert rupees -> paise
        const paise = tpl.price * 100;
        const order = await PaymentAPI.createOrder(paise);
        // loadRazorpay expects order.data.order
        await loadRazorpay(order.data.order, async (paymentResult) => {
          await PaymentAPI.verify({
            ...paymentResult,
            templateId: tpl.id,
            amount: paise,
          });
          setMsg(`✅ Switched to ${tpl.name} (Paid)`);
        });
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to switch template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-switcher">
      <p>Current: {current || "None"}</p>
      <div className="template-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <h4>{tpl.name}</h4>
            <p>{tpl.price === 0 ? "Free" : `₹${tpl.price}`}</p>
            <button onClick={() => switchTemplate(tpl)} disabled={loading}>
              {tpl.id === current ? "In Use" : "Switch"}
            </button>
          </div>
        ))}
      </div>
      {msg && <p className="status-msg">{msg}</p>}
    </div>
  );
}
