import path from "path"
import glob from "glob"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import postcss from "rollup-plugin-postcss"
// import { terser } from "rollup-plugin-terser"

const configs = []
const componentPaths = glob.sync(path.resolve(__dirname, "src/components/**/index.js"))

componentPaths.forEach(component => {
  const parts = component.split("/")
  let name = parts[parts.length - 2]

  configs.push({
    input: component,
    output: {
      file: path.resolve(__dirname, `lib/${name}.js`),
      format: "esm",
    },
    plugins: [
      resolve(),
      commonjs(),
      alias({
        entries: [{ find: "utils", replacement: "../../utils" }],
      }),
      postcss({
        modules: false,
        extract: false,
        inject: false,
        minimize: true,
      }),
      // terser(),
    ],
  })
})

export default configs
