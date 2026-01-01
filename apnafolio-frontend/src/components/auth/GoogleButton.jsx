import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api";
import { setAuth, getAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function GoogleButton() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google-one-tap", {
        credential: credentialResponse.credential,
      });

      const { token, user } = res.data;

      setAuth({ token, user });
      console.log("AUTH:", getAuth());

      if (user.isAdmin) return navigate("/admin");
      if (user.paid) return navigate("/dashboard");

      navigate("/form");
    } catch (err) {
      alert("Google login failed");
      console.error(err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google login error")}
        theme="filled_black"
        shape="pill"
      />
    </GoogleOAuthProvider>
  );
}

// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import api from "../../utils/api";
// import { setAuth } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";

// export default function GoogleButton() {
//   const navigate = useNavigate();
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const res = await api.post("/auth/google-one-tap", {
//         credential: credentialResponse.credential,
//       });
//       const { token, user } = res.data;

//       setAuth({ token, username: user.username });
      
//         // 1️⃣ ADMIN CHECK
//     if (user.isAdmin) {
//       navigate("/admin");
//       return;
//     }

//     // 2️⃣ USER PAID CHECK
//     if (user.paid) {
//       navigate("/dashboard");
//       return;
//     }

//     // 3️⃣ NOT PAID → GO TO FORM
//     navigate("/form");
//     } catch (err) {
//       console.error("Google login error:", err);
//       alert("Google login failed. Try again.");
//     }
//   };

//   const handleError = () => {
//     alert("Google login failed. Please try again.");
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div style={{ marginTop: "10px", textAlign: "center" }}>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           width="400"
//           text="continue_with"
//           theme="filled_blue"
//           shape="rectangular"
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import api from "../../utils/api";
// import { setAuth,getAuth } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";

// export default function GoogleButton() {
//   const navigate = useNavigate();
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const res = await api.post("/auth/google-one-tap", {
//         credential: credentialResponse.credential,
//       });
//       const { token, user } = res.data;

//       // Store Auth
//       setAuth({ token, user });

//       // Flow Logic
//       if (user.isAdmin) return navigate("/admin");
//       console.log("AUTH STATE:", getAuth());

//       if (user.paid) return navigate("/dashboard");
//       navigate("/form");

//     } catch (err) {
//       console.error("Google login error:", err);
//       alert("Google login failed. Try again.");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div className="google-btn-container">
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={() => alert("Login Failed")}
//           useOneTap
//           theme="filled_black" // Change to 'outline' if you want transparent look
//           shape="pill"         // Pill shape looks more modern/techy
//           width="100%"         // Container handle karel width
//           text="continue_with"
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }