import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "/one-by-one-quote/",
	build: {
		outDir: "dist",
	},
});
