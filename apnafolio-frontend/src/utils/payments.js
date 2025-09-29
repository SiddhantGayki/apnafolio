export const loadRazorpay = (order, callback) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key : import.meta.env.VITE_RAZORPAY_KEY, // ✅ matches .env
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: (response) => {
          callback(response);
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
