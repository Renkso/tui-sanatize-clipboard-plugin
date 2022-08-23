import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: './src/index.js',
        plugins: [
            peerDepsExternal(),
            nodeResolve(),
            // terser(),
            sourceMaps(),
        ],
        preserveModules: false,
        output: [
            { dir: 'dist', format: 'es', sourcemap: true },
        ],
        watch: {
            clearScreen: true,
            include: 'src/**',
        },
    },
];