import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
const pathToKey = './certs/localhost+2-key.pem';
const pathToCert = './certs/localhost+2.pem';

export default defineConfig({
  plugins: [react()], // Añade una coma aquí
  server: {
    https: {
      key: fs.readFileSync(pathToKey),
      cert: fs.readFileSync(pathToCert)
    },
    port: 5173  
  }
});
