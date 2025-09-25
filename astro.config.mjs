// @ts-check
import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { remarkReadingTime } from './src/utils/remark-reading-time.ts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [basicSsl(), tailwindcss()],
  },
  integrations: [react(), mdx()],
  // redirects: Record.<string, RedirectConfig> || { string: string } || string: { status: number, destination: string}
  // Regirige a una dirección diferente
  // Nota: todas ls solicitudes GET seran redirigidas con un status 301 (moved permanently)
  redirects: {
    '/': {
      status: 301,
      destination: '/blog',
    },
  },
  // Se puede establecer según el comando que puerto se utiliara (SOLO en preview y dev)
  // Nota: de igual manera se puede pasar solo un objeto con el puerto y otra configuración
  server: ({ command }) => {
    return {
      host: true,
      // port: number
      port: command === 'dev' ? 4000 : 4080,
      // open: string | boolean
      // Abre el navegador al encender el servidor
      // Nota: puede ser un booleano o un string que especifique que ruta abrira
      open: false,
    }
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    }),
  ],
  // Elimina la barra de herramientas que viene por defecto en astrojs.
  devToolbar: {
    enabled: false,
  },
})
