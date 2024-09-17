// @ts-nocheck
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { PuikResolver } from '@prestashopcorp/puik-resolver';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [vue(), tailwind()],
  vite: {
    plugins: [
      Components({
        resolvers: [PuikResolver()],
      }),
      AutoImport({
        resolvers: [PuikResolver()],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer
        ]
      }
    },
    ssr: {
      noExternal: ['@prestashopcorp/puik-theme', '@prestashopcorp/puik-components'],
    }
  }
});
