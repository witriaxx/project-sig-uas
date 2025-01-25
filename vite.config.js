import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css", // CSS utama
                "resources/js/app.js", // JS utama
                "resources/js/map.js", // JS untuk Mapbox
                "resources/css/map.css", // CSS khusus Mapbox
            ],
            refresh: true,
        }),
    ],
});
