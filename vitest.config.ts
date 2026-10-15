import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['test/**/*.test.{ts,tsx}'],
      setupFiles: ['./test/setup/vitest.setup.ts'],
      maxWorkers: 4,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/main.tsx'],
        reporter: ['text', 'html', 'lcov'],
      },
    },
  }),
);
