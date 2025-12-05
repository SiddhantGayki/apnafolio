// src/components/auth/GoogleOneTap.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { setAuth } from "../../utils/auth";

export default function GoogleOneTap() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      console.error("VITE_GOOGLE_CLIENT_ID not set");
      return;
    }

    const handleCredentialResponse = async (response) => {
      try {
        const res = await api.post("/auth/google-one-tap", {
          credential: response.credential,
        });

        const data = res.data;
        const { token, user } = data;

        if (!token || !user) {
          console.error("Invalid Google one tap response:", data);
          return;
        }

        setAuth({ token, username: user.username });

        // 1️⃣ ADMIN CHECK
    if (user.isAdmin) {
      navigate("/admin");
      return;
    }

    // 2️⃣ USER PAID CHECK
    if (user.paid) {
      navigate("/dashboard");
      return;
    }

    // 3️⃣ NOT PAID → GO TO FORM
    navigate("/form");

      } catch (err) {
        console.error("Google one tap error:", err);
        alert(
          err.response?.data?.message || "Google login failed. Try normal login."
        );
      }
    };

    const initialize = () => {
      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
      ) {
        console.error("Google Identity Services SDK not available");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Show One Tap prompt
      window.google.accounts.id.prompt();
    };

    if (
      window.google &&
      window.google.accounts &&
      window.google.accounts.id
    ) {
      initialize();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initialize;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [clientId, navigate]);

  // One Tap हा popup आहे – UI component नको
  return null;
}
