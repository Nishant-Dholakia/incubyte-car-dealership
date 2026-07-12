// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Automatically copy generated assets from C: drive brain folder to local assets on D: drive
const sourceDir = "C:/Users/Dholakia Nishant/.gemini/antigravity/brain/4766df93-109b-4978-bcb4-1963ff42e06a";
const destDir = path.resolve(__dirname, "./src/assets");

const filesToCopy = {
  "hero_luxury_car_1783848453753.png": "hero_luxury_car.png",
  "featured_suv_car_1783848470462.png": "featured_suv.png",
  "featured_sports_car_1783848485036.png": "featured_sports.png",
  "featured_electric_car_1783848500482.png": "featured_electric.png"
};

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  for (const [srcName, destName] of Object.entries(filesToCopy)) {
    const srcPath = path.join(sourceDir, srcName);
    const destPath = path.join(destDir, destName);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Successfully copied ${srcName} to ${destName}`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  }
} catch (err) {
  console.error("Failed to copy assets in vite.config.js:", err);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});