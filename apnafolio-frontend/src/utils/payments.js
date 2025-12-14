// frontend/src/utils/payment.js
export const loadRazorpay = (order) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "ApnaFolio",
        description: "Template Purchase",
        theme: { color: "#5e17eb" },

        handler: async function (response) {
          console.log("🪙 Razorpay Payment Response:", response);

          try {
            const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                templateId: order.templateId,
                amount: order.amount,
              }),
            });

            const result = await verifyRes.json();
            if (result.success) {
              alert("✅ Payment Verified Successfully!");
              window.location.href = "/dashboard";
            } else {
              alert("❌ Payment verification failed: " + result.message);
            }
          } catch (err) {
            console.error("Verify error:", err);
            alert("Something went wrong verifying payment!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
