import restart from 'vite-plugin-restart'
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig ({
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        port: 3000,
        open: true//!('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    optimizeDeps:
    {
        include: ['i18next', 'i18next-http-backend']
    },
    base: './',
    build:
    {
        outDir: './dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        cssCodeSplit: false, // If CSS is being split, set this to false
        rollupOptions: {
            //external: ['i18next', 'i18next-http-backend'],
        }
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }), // Restart server on static file change
        viteStaticCopy({
            targets: [
                { src: 'languages/*.json', dest: 'languages' } // Copy language files
            ]
        })
    ],
});