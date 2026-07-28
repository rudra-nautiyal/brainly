// src/components/GuestRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

// Wrap /signin and /signup with this so a logged-in user visiting them
// gets redirected straight to their dashboard instead of seeing the form.
export function GuestRoute({ children }: { children: ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
