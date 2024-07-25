import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // changing from /se_project_react/ to /
  plugins: [react()],
  server: {
    port: 3000,
  },
});

/* original 
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // add the server object
  server: {
    port: 3000,
  },
});
*/
