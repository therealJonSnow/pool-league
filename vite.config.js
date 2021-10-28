import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteFS from 'vite-fs'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    viteFS(),
    Components({
     resolvers: [
        ElementPlusResolver(),
      ],
     dts: true,
     include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
})
