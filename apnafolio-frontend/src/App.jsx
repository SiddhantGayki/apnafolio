import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Verify from "./pages/auth/Verify";
import ForgotPassword from "./pages/auth/ForgetPassword";

// Public Pages
import Portfolio from "./pages/public/Portfolio";
import PortfolioPage from "./pages/PortfolioPage";
import IntroPage from "./pages/IntroPage";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

// Resume Builder
import ResumePage from "./pages/form/ResumePage";
import TemplateList from "./templates/TemplateList";
import TemplatesExplore from "./templates/TemplatesExplore"
import TemplatesPreview from "./templates/TemplatesPreview";

// ------------------- Private Route -------------------
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// ------------------- App Component -------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/u/:username" element={<Portfolio />} />
        <Route path="/templates/preview/:templateId" element={<TemplatesPreview />} />
        <Route path="/portfolio/:username" element={<PortfolioPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* User Paid */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Protected */}
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <ResumePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <PrivateRoute>
              <TemplateList />
            </PrivateRoute>
          }
        />
        <Route
          path="/templateE"
          element={
            <PrivateRoute>
              <TemplatesExplore/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
