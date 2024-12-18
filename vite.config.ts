import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default {
  plugins: [
    react(),
    tsconfigPaths({
      projects: [
        './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
      ],
    }),
  ],
  define: {
    global: 'window',
  },
};
