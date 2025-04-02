import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
  mergeConfig,
} from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        'dist_{mr,int,prd,eu}/**',
        'public/**',
        'src/configs/**',
      ],
      reporters: ['default'],
      coverage: {
        enabled: true,
        exclude: [
          ...coverageConfigDefaults.exclude,
          'dist_{mr,int,prd,eu}/**',
          'html/**',
          'src/configs',
          'src/domain',
          'src/infraestructure',
        ],
        reporter: ['text', 'html'],
        reportOnFailure: true,
        provider: 'v8',
      },
      outputFile: {
        junit: './junit.xml',
      },
    },
  }),
);
