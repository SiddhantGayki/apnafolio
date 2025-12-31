//  new
// src/utils/api.js
import axios from "axios";
import { clearAuth } from "./auth";

// ✅ Base URL logic: prefer env, else fallback to backend deployed URL, else /api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://apnafolio.onrender.com/api",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearAuth();
    }
    return Promise.reject(err);
  }
);

// ✅ AUTH
export const AuthAPI = {
  login: (data) => api.post("/auth/login", data),
  signup: (data) => api.post("/auth/signup", data),
  verifyOtp: (data) => api.post("/auth/verify", data),
  forgotPassword: (email) => api.post("/password/forgot-password", { email }),
  resetPassword: (payload) => api.post("/password/reset-password", payload),
};

// ✅ USER
export const UserAPI = {
  saveResume: (data) => api.post("/user/resume", data),
  getPortfolio: (username) => api.get(`/user/portfolio/${username}`),
  switchTemplate: (templateId) => api.post("/user/switch-template", { templateId }),
  getDashboard: () => api.get("/user/dashboard"),
};

// ✅ PAYMENT
export const PaymentAPI = {
  createOrder: (amount) => 
    api.post("/payment/order", { amount }),
  verifyPayment: (data) => api.post("/payment/verify", data),
};

// ✅ Razorpay loader
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
        // handler: async (response) => {
        //   try {
        //     await PaymentAPI.verifyPayment({
        //       ...response,
        //       amount: order.amount,
        //       templateId,
        //     });
        //     resolve(response);
        //   } catch (err) {
        //     reject(err);
        //   }
        // },
        // loadRazorpay फंक्शनमध्ये handler च्या आत हा बदल कर:
handler: async (response) => {
  try {
    await PaymentAPI.verifyPayment({
      ...response,
      templateId,
      // ✅ पैशाचे पुन्हा रुपयांत रूपांतर करून बॅकएंडला पाठवा
      amount: order.amount / 100, 
    });
    resolve(response);
  } catch (err) {
    reject(err);
  }
},
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export default api;
