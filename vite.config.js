import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
export default defineConfig({
    base: '/',
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
                    reactRouterDom: ['react-router-dom']
                },
            }
        },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-router-dom',
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
    plugins: [react()],
});
