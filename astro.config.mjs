import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  // https://cumak.net/blog/astro/
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name][extname]',
        },
      },
      cssCodeSplit: false,
      // minify: false,
    },
  },
})
