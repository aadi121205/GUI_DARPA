import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/cert.pem")),
    },
    host: true, // Allow external access
    port: 5173, // Change if needed
  },
});