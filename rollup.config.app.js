import path from "path"
import serve from "rollup-plugin-serve"
import commonjs from "@rollup/plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"

const PUBLIC_PATH = path.resolve(__dirname, "public")

export default {
  input: path.resolve(__dirname, "src/components/index.js"),
  output: {
    file: path.resolve(__dirname, "public/bundle.js"),
    format: "iife",
  },
  plugins: [
    resolve(),
    commonjs(),
    serve({
      open: true,
      contentBase: PUBLIC_PATH,
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
    }),
    livereload({
      watch: PUBLIC_PATH,
    }),
    postcss({
      modules: false,
      extract: false,
      inject: false,
      minimize: true,
    }),
  ],
}
