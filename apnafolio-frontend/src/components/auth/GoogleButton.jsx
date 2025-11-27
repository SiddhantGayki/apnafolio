import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api";
import { setAuth } from "../../utils/auth";
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

      setAuth({ token, username: user.username });
      navigate(user.isAdmin ? "/admin" : "/form");
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed. Try again.");
    }
  };

  const handleError = () => {
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          width="300"
          text="continue_with"
          theme="filled_blue"
          shape="rectangular"
        />
      </div>
    </GoogleOAuthProvider>
  );
}
