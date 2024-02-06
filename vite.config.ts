import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript2 from "rollup-plugin-typescript2";
import {fileURLToPath, URL} from 'node:url';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typescript2({
            check: false,
            include: ["src/pluginBuilder.ts","src/components/index.ts", "src/components/*/*.vue"],
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
                exclude: ["vite.config.ts"],
            },
        })
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: 'src/pluginBuilder.ts',
            formats: ['es', 'cjs'],
            name: 'pluginBuilder',
            fileName: (format) => format === 'es' ? "index.js" : `index.cjs`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                exports: 'named'
            }
        }
    },

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        }
    }
})