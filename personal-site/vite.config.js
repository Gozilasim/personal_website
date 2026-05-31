/*
Created at: 2026-05-03 05:06
Updated at: 2026-05-31 01:53
Description: Vite configuration for the interactive personal site app.
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// ###############################################
// Vite App
// ###############################################
export default defineConfig({
    envDir: "..",
    plugins: [react()],
});
