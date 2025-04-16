import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [svgr(), react(), tsconfigPaths()],
	define: {
		"process.env": {},
	},
	server: {
		port: "5000",
	},
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
