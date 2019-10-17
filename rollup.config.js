import resolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"
import path from "path"
import glob from "glob"

const configs = []
const componentPaths = glob.sync(path.resolve(__dirname, "components/**/index.js"))

componentPaths.forEach(component => {
  const parts = component.split("/")
  const input = parts[parts.length - 2] // e.g. "modal"

  configs.push({
    input: component,
    output: {
      file: path.resolve(__dirname, `dist/${input}.js`),
      format: "umd",
    },
    plugins: [
      resolve(),
      postcss({ modules: false, extract: false, inject: false, minimize: true }),
      terser({
        output: {
          comments: (_, comment) => {
            const { value, type } = comment

            if (type === "comment2") {
              return /@preserve|@license|@cc_on/i.test(value)
            }
          },
        },
      }),
    ],
  })
})

export default configs
