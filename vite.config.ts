import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import fs from 'fs';

const getHtmlEntries = () => {
  const pagesDir = path.resolve(__dirname, "");
  const entries = {};

  // Read all files in the directory
  const files = fs.readdirSync(pagesDir);

  // Filter for HTML files
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  // Create entries for each HTML file
  htmlFiles.forEach((file) => {
    const name = path.basename(file, ".html");
    entries[name] = path.resolve(pagesDir, file);
  });

  return entries;
}

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
    }
  }
});
