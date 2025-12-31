// // src/components/TemplateList.jsx
// import React, { useState } from "react";
// import templates from "./templatesData";
// import "./TemplateList.css";
// import api from "../utils/api";
// import { getUsername } from "../utils/auth";
// import Spinner from "../components/Spinner";

// export default function TemplateList({ allowBuy = true }) {
//   const username = getUsername();
//   const [loading, setLoading] = useState(false);

//   const handleBuy = async (templateId, price) => {
//     try {
//       setLoading(true);

//       // ✅ 1. Create order (SEND RUPEES, backend converts to paise)
//       const orderRes = await api.post("/payment/order", {
//         amount: price,
//       });

//       const order = orderRes.data.order;
//       if (!order || !order.id) {
//         throw new Error("Order creation failed");
//       }

//       // ✅ 2. Razorpay options
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount, // paise (from backend)
//         currency: order.currency,
//         order_id: order.id,
//         name: "ApnaFolio",
//         description: "Portfolio Template Purchase",
//         theme: { color: "#5e17eb" },

//         handler: async function (response) {
//           try {
//             // ✅ 3. Verify payment
//             const verifyRes = await api.post("/payment/verify", {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//               templateId,
//               amount: price,
//             });

//             if (verifyRes.data.success) {
//               window.location.href = `/u/${username}`;
//             } else {
//               alert("❌ Payment verification failed");
//             }
//           } catch (err) {
//             console.error("Verify error:", err);
//             alert("❌ Error verifying payment");
//           }
//         },
//       };

//       // ✅ 4. Open Razorpay popup
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment initiate error:", err);
//       alert("❌ Payment failed to initiate");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="template-list-container">
//       <h2>Choose Your Perfect Template</h2>

//       {loading && <Spinner />}

//       <div className="template-grid">
//         {templates.map((tpl) => (
//           <div key={tpl.id} className="template-card">
//             <div className="template-preview">
//               <iframe
//                 src={tpl.demoUrl}
//                 title={tpl.name}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   border: "none",
//                   borderRadius: "8px",
//                 }}
//               />
//             </div>

//             <h3>{tpl.name}</h3>
//             <p className="template-price">₹{tpl.price}</p>

//             <ul className="template-features">
//               {Array.isArray(tpl.features)
//                 ? tpl.features.map((f, i) => <li key={i}>• {f}</li>)
//                 : <li>{tpl.features}</li>}
//             </ul>

//             <div className="template-actions">
//               <a
//                 href={tpl.demoUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-preview"
//               >
//                 👁 Preview
//               </a>

//               {allowBuy && (
//                 <button
//                   onClick={() => handleBuy(tpl.id, tpl.price)}
//                   className="btn btn-buy"
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Buy"}
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import templates from "./templatesData";
import "./TemplateList.css";
import api from "../utils/api";
import { getUsername } from "../utils/auth";
import Spinner from "../components/Spinner";

export default function TemplateList({ allowBuy = true }) {
  const username = getUsername();
  const [loading, setLoading] = useState(false);

  const handleBuy = async (templateId, price) => {
    try {
      setLoading(true);

      // 1. Create order (SEND RUPEES, backend converts to paise)
      const orderRes = await api.post("/payment/order", {
        amount: price,
      });

      const order = orderRes.data.order;
      if (!order || !order.id) {
        throw new Error("Order creation failed");
      }

      // 2. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount, // paise (from backend)
        currency: order.currency,
        order_id: order.id,
        name: "ApnaFolio",
        description: "Portfolio Template Purchase",
        theme: { color: "#4F6FFF" }, // Your primary blue

        handler: async function (response) {
          try {
            // 3. Verify payment
            const verifyRes = await api.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              templateId,
              amount: price,
            });

            if (verifyRes.data.success) {
              window.location.href = `/u/${username}`;
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Verify error:", err);
            alert("❌ Error verifying payment");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiate error:", err);
      alert("❌ Payment failed to initiate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-market-container">
      {/* Background Decor */}
      <div className="market-glow blue-orb"></div>
      <div className="market-grid-bg"></div>

      <header className="market-header">
        <div className="market-badge">Premium Collections</div>
        <h2>Pick Your <span>Digital Identity</span></h2>
        <p>One-time payment. Lifetime ownership. No hidden charges.</p>
      </header>

      {loading && <Spinner />}

      <div className="market-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="market-card">
            <div className="market-preview-box">
              <div className="price-badge">₹{tpl.price}</div>
              <iframe
                src={tpl.demoUrl}
                title={tpl.name}
                className="market-iframe"
                scrolling="no"
              />
              <div className="iframe-overlay">
                 <a href={tpl.demoUrl} target="_blank" rel="noreferrer" className="glass-btn">
                   Full Preview 👁️
                 </a>
              </div>
            </div>

            <div className="market-info">
              <h3>{tpl.name}</h3>
              
              <ul className="feature-list">
                {Array.isArray(tpl.features)
                  ? tpl.features.map((f, i) => <li key={i}>✦ {f}</li>)
                  : <li>✦ {tpl.features}</li>}
              </ul>

              <div className="market-actions">
                {allowBuy && (
                  <button
                    onClick={() => handleBuy(tpl.id, tpl.price)}
                    className="buy-btn-gold"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Get Access Now"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}