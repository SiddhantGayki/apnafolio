// Get Username
export const getUsername = () => localStorage.getItem("username");

// Save Auth
export const setAuth = ({ token, username }) => {
  if (token) localStorage.setItem("token", token);
  if (username) localStorage.setItem("username", username);
};

// Get Token
export const getToken = () => localStorage.getItem("token");

// CLEAR Auth
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

// ⭐ The missing part → Add this
export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  };
};

// // src/utils/auth.js
// export const getUsername = () => localStorage.getItem("username");
// // src/utils/auth.js
// export const setAuth = ({ token, username }) => {
//   if (token) localStorage.setItem("token", token);
//   if (username) localStorage.setItem("username", username);
// };

// export const getToken = () => localStorage.getItem("token");

// export const clearAuth = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
// };
