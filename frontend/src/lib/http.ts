// src/lib/http.ts
import axios from "axios";
import { BACKEND_URL } from "../config";
import { getToken } from "./auth";

export const http = axios.create({
  baseURL: BACKEND_URL,
});

// Attach the JWT (if we have one) to every outgoing request.
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever tells us the token is missing/expired, clear it and
// bounce the user back to the sign-in page instead of leaving them stuck
// on a broken dashboard.
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  },
);
