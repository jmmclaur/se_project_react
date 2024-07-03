import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/se_project_react/", // add this field
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
