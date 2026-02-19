import React from "react";
import api from "../utils/api";
import { loadRazorpay } from "../utils/CreditPayment";

export default function CreditPurchaseModal({ open, onClose }) {
  if (!open) return null;

  const buyCredits = async (type) => {
    try {
      const price = type === "credit1" ? 49 : 1;

      const orderRes = await api.post("/payment/order", {
        amount: price,
      });

      await loadRazorpay(
        orderRes.data.order,
        null,
        type // purchaseType
      );

      onClose();
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div className="credit-modal-overlay">
      <div className="credit-modal">
        <h2>Buy Edit Credits</h2>

        <div className="credit-options">
          <div className="credit-box">
            <h3>1 Edit</h3>
            <p>₹49</p>
            <button onClick={() => buyCredits("credit1")}>
              Buy Now
            </button>
          </div>

          <div className="credit-box popular">
            <h3>3 Edits</h3>
            <p>₹99</p>
            <button  className="btn-buy" onClick={() => buyCredits("credit3")}>
              Buy Now
            </button>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>
          ❌
        </button>
      </div>
    </div>
  );
}
