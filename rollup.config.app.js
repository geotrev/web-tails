import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import resolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import path from "path"

const PUBLIC_PATH = "public"

export default {
  input: path.resolve(__dirname, "components/index.js"),
  output: {
    file: path.resolve(__dirname, "public/bundle.js"),
    format: "umd",
  },
  plugins: [
    serve({
      open: true,
      contentBase: PUBLIC_PATH,
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: PUBLIC_PATH }),
    resolve(),
    postcss({ modules: false, extract: false, inject: false, minimize: true }),
  ],
}
