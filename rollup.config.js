import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const env = process.env.NODE_ENV;

const config = {
    input: "./src/index.ts",

    output: {
        format: "umd",
        name: "MemoRenderInline",
    },
    
    plugins: [
        resolve({ extensions }),

        commonjs(),

        babel({
            extensions,
            include: ["src/**/*"],
            exclude: "**/node_modules/**",
            runtimeHelpers: true,
        }),
    ],

    external: Object.keys(pkg.peerDependencies),

};

if (env === "production") {
    config.plugins.push(
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        })
    );
}

export default config;
