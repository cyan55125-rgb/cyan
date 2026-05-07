import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

function removeModuleType(): Plugin {
  return {
    name: 'remove-module-type',
    transformIndexHtml(html) {
      return html.replace(/<script type="module" /g, '<script ');
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
  plugins: [
    react(),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths(),
    removeModuleType(),
  ],
})
