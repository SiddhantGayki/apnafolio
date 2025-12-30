export const loadRazorpay = (order, templateId) => {
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
                  ...response,
                  templateId,
                  amount: order.amount, // / 100, // convert paise to rupees
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
