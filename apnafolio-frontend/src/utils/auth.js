// // Get Username
// export const getUsername = () => localStorage.getItem("username");

// // Save Auth
// export const setAuth = ({ token, username }) => {
//   if (token) localStorage.setItem("token", token);
//   if (username) localStorage.setItem("username", username);
// };

// // Get Token
// export const getToken = () => localStorage.getItem("token");

// // CLEAR Auth
// export const clearAuth = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
// };

// // ⭐ The missing part → Add this
// export const getAuth = () => {
//   return {
//     token: localStorage.getItem("token"),
//     username: localStorage.getItem("username"),
//   };
// };


// Save Auth
export const setAuth = ({ token, user }) => {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

// Get Auth
export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };
};

// Get Username (optional)
export const getUsername = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.username;
};

// Clear Auth
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
// ✅ ADD THIS (🔥 FIX)
export const getToken = () => {
  return localStorage.getItem("token");
};
