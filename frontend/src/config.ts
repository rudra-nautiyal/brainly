// Falls back to localhost for local dev, but lets you point the built
// frontend at a real API by setting VITE_BACKEND_URL at build time.
export const BACKEND_URL: string =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ??
  "http://localhost:3000";
