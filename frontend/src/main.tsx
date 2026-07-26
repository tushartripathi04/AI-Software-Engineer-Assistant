import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import QueryProvider from "./app/providers/QueryProvider";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster richColors position="top-right" /> 
    </QueryProvider>
  </StrictMode>
);