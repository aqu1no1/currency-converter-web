import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@pages': fromRoot('./src/pages'),
      '@components': fromRoot('./src/components'),
      '@contexts': fromRoot('./src/contexts'),
      '@hooks': fromRoot('./src/hooks'),
      '@services': fromRoot('./src/services'),
      '@theme': fromRoot('./src/theme'),
      '@styles': fromRoot('./src/styles'),
      '@constants': fromRoot('./src/constants'),
      '@dtos': fromRoot('./src/dtos'),
      '@models': fromRoot('./src/models'),
      '@interfaces': fromRoot('./src/interfaces'),
      '@enums': fromRoot('./src/enums'),
      '@utils': fromRoot('./src/utils'),
      '@lib': fromRoot('./src/lib'),
      '@locales': fromRoot('./src/locales'),
      '@assets': fromRoot('./src/assets'),
      '@test': fromRoot('./test'),
    },
  },
});
