import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/https://github.com/lee7198/IndustryClient.git/', // ex: /my_project/
  plugins: [react()],
});
