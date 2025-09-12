import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { SupabaseProvider } from "./supabase";
import { ToastProvider } from "./components/Toast";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <SupabaseProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </SupabaseProvider>
      </BrowserRouter>
    </StrictMode>
  );
});
