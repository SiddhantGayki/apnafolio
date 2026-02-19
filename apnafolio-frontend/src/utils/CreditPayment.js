export const loadRazorpay = (order, templateId, purchaseType) => {
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
        description: "Edit Credit Purchase",
        theme: { color: "#5e17eb" },


        handler: async (response) => {
          try {
            await fetch(
              `${import.meta.env.VITE_API_URL}/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  templateId,
                  amount: order.amount / 100,
                  purchaseType, // ✅ USE PASSED VALUE
                }),
              }
            );

            resolve(response);
          } catch (err) {
            reject(err);
          }
        },

      };

      new window.Razorpay(options).open();
    };

    script.onerror = reject;
    document.body.appendChild(script);
  });
};