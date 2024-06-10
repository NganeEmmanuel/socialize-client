import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    fallback: {
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'zlib': require.resolve('browserify-zlib'),
      'assert': require.resolve('assert/'),
      'is-nan': require.resolve('is-nan'),
    },
  },
});