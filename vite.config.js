import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    base: '/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://aktyres-in.stackstaging.com/php-truck/class',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); }
            }
        }
    },
    build: {
        outDir: './dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
                manualChunks: {
                    reactRouterDom: ['react-router-dom'],
                    framerMotion: ['framer-motion'],
                },
            }
        },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-router-dom',
            'antd',
            'axios',
            'framer-motion',
            'ag-grid-community',
            'ag-grid-react',
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },
    plugins: [
        react(),
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            // add this to cache all the
            // static assets in the public folder
            includeAssets: [
                "**/*",
            ],
            manifest: {
                "theme_color": "#110C23",
                "background_color": "#110C23",
                "display": "standalone",
                "scope": "/",
                "start_url": "/",
                "short_name": "AK Tyres",
                "description": "AK Tyres Customer Portal",
                "name": "AK Tyres Customer Portal",
                "icons": [
                    {
                        "src": "/logo-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    }
                ]
            }
        })
    ],
});
