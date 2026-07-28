import { DashBoard } from "./pages/dashboard";
import { SharedBrain } from "./pages/SharedBrain";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#101820",
            color: "#fff",
            fontWeight: 600,
            border: "2px solid #101820",
            boxShadow: "4px 4px 0px 0px rgba(16,24,32,0.3)",
          },
          success: {
            iconTheme: { primary: "#FEE715", secondary: "#101820" },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <GuestRoute>
              <Signin />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route path="/share/:shareLink" element={<SharedBrain />} />

        {/* Anything unrecognized falls back to the dashboard (which will
            redirect to /signin itself if the user isn't logged in). */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
