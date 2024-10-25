import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});

//took out /se_project_react/ and replaced w "/"
// hmm that change just makes the weather bar and clothes disappear, idk
