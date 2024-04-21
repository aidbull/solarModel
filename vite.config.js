import { defineConfig } from 'vite';
import VitePluginString from 'vite-plugin-string'; // Correct import statement

export default defineConfig({
    plugins: [
        VitePluginString() // Correct usage of the plugin
    ]
});
