import resolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
// import terser from "rollup-plugin-terser"
import glob from "glob"

const configs = []

const componentPaths = glob.sync(path.resolve(__dirname, "/src/**/index.js"))

componentPaths.forEach(component => {
  const parts = component.split("/")
  const input = parts[parts.length - 2] // e.g. "modal"

  configs.push({
    input,
    output: {
      file: path.resolve(__dirname, `dist/${input}`),
      format: "umd",
    },
    plugins: [resolve(), postcss({ modules: true, extract: false })],
  })
})

export default configs
