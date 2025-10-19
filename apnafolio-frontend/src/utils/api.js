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
  createOrder: (amount) => api.post("/payment/order", { amount }),
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
        handler: async (response) => {
          try {
            await PaymentAPI.verifyPayment({
              ...response,
              amount: order.amount,
              templateId,
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



// // src/utils/api.js
// import axios from "axios";
// import { clearAuth } from "./auth";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://apnafolio.onrender.com/api",
//   timeout: 20000,
// });

// // attach token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // handle 401 globally
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       clearAuth();
//     }
//     return Promise.reject(err);
//   }
// );

// // ✅ AUTH
// export const AuthAPI = {
//   login: (data) => api.post("/auth/login", data),
//   signup: (data) => api.post("/auth/signup", data),
//   verifyOtp: (data) => api.post("/auth/verify", data),
//   forgotPassword: (email) => api.post("/password/forgot-password", { email }),
//   resetPassword: (payload) => api.post("/password/reset-password", payload),
// };

// // ✅ USER
// export const UserAPI = {
//   saveResume: (data) => api.post("/user/resume", data),
//   getPortfolio: (username) => api.get(`/user/portfolio/${username}`),
//   switchTemplate: (templateId) => api.post("/user/switch-template", { templateId }),
//   getDashboard: () => api.get("/user/dashboard"),
// };

// // ✅ PAYMENT
// export const PaymentAPI = {
//   createOrder: (amount) => api.post("/payment/order", { amount }),
//   verifyPayment: (data) => api.post("/payment/verify", data),
// };

// export const loadRazorpay = (order, templateId) => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => {
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             await PaymentAPI.verifyPayment({
//               ...response,
//               amount: order.amount,
//               templateId,
//             });
//             resolve(response);
//           } catch (err) {
//             reject(err);
//           }
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     };
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// // ✅ default axios
// export default api;


// import axios from "axios";
// import { clearAuth } from "./auth";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://apnafolio.onrender.com/api",
//   timeout: 20000,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       clearAuth();
//     }
//     return Promise.reject(err);
//   }
// );

// export const PaymentAPI = {
//   createOrder: (amount) => api.post("/payment/order", { amount }), // send INR, backend multiplies
//   verifyPayment: (data) => api.post("/payment/verify", data),
// };

// export const loadRazorpay = (order, templateId) => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => {
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             await PaymentAPI.verifyPayment({
//               ...response,
//               amount: order.amount,
//               templateId,
//             });
//             resolve(response);
//           } catch (err) {
//             reject(err);
//           }
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     };
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// // export default api;


// // // src/utils/api.js
// // import axios from "axios";
// // import { clearAuth } from "./auth";

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL || "https://apnafolio.onrender.com/api",
// //   timeout: 20000,
// // });

// // // Add token automatically
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // // Optional: handle 401 globally (auto sign-out)
// // api.interceptors.response.use(
// //   (res) => res,
// //   (err) => {
// //     if (err?.response?.status === 401) {
// //       // token invalid/expired: clear auth and optionally redirect
// //       clearAuth();
// //       // optionally: window.location.href = "/login";
// //     }
// //     return Promise.reject(err);
// //   }
// // );

// // export const AuthAPI = {
// //   login: (data) => api.post("/auth/login", data),
// //   signup: (data) => api.post("/auth/signup", data),
// //   verifyOtp: (data) => api.post("/auth/verify", data),
// //   forgotPassword: (email) => api.post("/password/forgot-password", { email }),
// //   resetPassword: (payload) => api.post("/password/reset-password", payload),
// // };

// // export const UserAPI = {
// //   saveResume: (data) => api.post("/user/resume", data),
// //   getPortfolio: (username) => api.get(`/user/portfolio/${username}`),
// //   switchTemplate: (templateId) => api.post("/user/switch-template", { templateId }),
// //   getDashboard: () => api.get("/user/dashboard"),
// // };

// // export const PaymentAPI = {
// //   createOrder: (amount) => api.post("/payment/order", { amount }), // amount in paise
// //   verifyPayment: (data) => api.post("/payment/verify", data),
// // };

// // export const loadRazorpay = (order, callback) => {
// //   return new Promise((resolve, reject) => {
// //     const script = document.createElement("script");
// //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //     script.onload = () => {
// //       const options = {
// //         key: import.meta.env.VITE_RAZORPAY_KEY,
// //         amount: order.amount,
// //         currency: order.currency,
// //         order_id: order.id,
// //         handler: (response) => callback(response),
// //       };
// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //       resolve();
// //     };
// //     script.onerror = reject;
// //     document.body.appendChild(script);
// //   });
// // };

// // export default api;
