import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { transformSync } from 'esbuild';

const transformJsxInJsPlugin = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    const [filepath] = id.split('?');
    if (
      (filepath.endsWith('.js') || filepath.endsWith('.jsx')) &&
      !filepath.includes('node_modules') &&
      !filepath.includes('.vite')
    ) {
      const result = transformSync(code, {
        loader: 'jsx',
        jsx: 'automatic',
        sourcefile: id,
      });
      return {
        code: result.code,
        map: result.map,
      };
    }
    return null;
  },
});

export default defineConfig(() => {
  return {
    plugins: [
      transformJsxInJsPlugin(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
        'next/font/google': path.resolve('./src/shims/next-font.js'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
