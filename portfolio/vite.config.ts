/*
Created at: 2026-05-10 02:54
Updated at: 2026-05-31 01:53
Description: Vite configuration for the portfolio book app.
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ###############################################
// Vite App
// ###############################################

export default defineConfig({
  base: "./",
  envDir: "..",
  plugins: [react()],
});
