import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/Random-Quote-Generator/", // Adjust this to your repository name
	build: {
		outDir: "dist",
	},
});
