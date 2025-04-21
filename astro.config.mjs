// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [react(), mdx()],
    devToolbar: {
        enabled: false,
    },
    // redirects: Record.<string, RedirectConfig> || { string: string } || string: { status: number, destination: string}
    // Regirige a una dirección diferente
    // Nota: todas ls solicitudes GET seran redirigidas con un status 301 (moved permanently) 
    // redirects: {
    //     "/": {
    //         status: 301,
    //         destination: "/me",
    //     },
    // },
    // Se puede establecer según el comando que puerto se utiliara (SOLO en preview y dev)
    // Nota: de igual manera se puede pasar solo un objeto con el puerto y otra configuración
    server: ({ command }) => {
        return {
            // port: number
            port: command === "dev" ? 4000 : 4080,
            // open: string | boolean
            // Abre el navegador al encender el servidor
            // Nota: puede ser un booleano o un string que especifique que ruta abrira
            open: false,
        }
    },
});
