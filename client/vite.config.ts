import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(process.cwd(), '..'), 'VITE');

  return {
    plugins: [react()],
    envDir: path.join(process.cwd(), '..'), // need this to load .env file in tsx files
    server: {
      port: parseInt(env.VITE_CLIENT_PORT || '5173'),
      host: true, // Allows connections from network, not just localhost
    },
    prettier: {
      configPath: path.resolve(__dirname, '../.prettierrc'),
    },
  };
});
