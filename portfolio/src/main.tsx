/*
Created at: 2026-05-10 02:54
Updated at: 2026-05-10 02:54
Description: React root bootstrap for the portfolio book app.
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// ###############################################
// React Mount
// ###############################################

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
