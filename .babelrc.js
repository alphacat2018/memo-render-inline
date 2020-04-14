const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = BABEL_ENV === "commonjs";

module.exports = {
    presets: ["@babel/preset-env", "@babel/typescript"],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                absoluteRuntime: false,
                corejs: 3,
                helpers: true,
                regenerator: true,
                useESModules: !cjs,
                version: "7.9.2",
            },
        ],
    ],
};
