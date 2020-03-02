import glob from "glob"
import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"

const configs = []
const external = []
const formats = ["esm", "cjs"]

// Get all the files that need to be bundled from `src/`
const files = glob.sync(path.resolve(__dirname, "src/**/*.js"))

// Push all non-index.js files into the `external` array.
files.forEach(filePath => {
  const parts = filePath.split("/")

  // Get the import name, exclude the extension
  const name = parts[parts.length - 1].split(".")[0]

  // If it's not index.js, push up to two nested levels deep of possible import/export paths
  if (!name.includes("index")) external.push(`./${name}`, `../${name}`, `../../${name}`)
})

// Build both esm and cjs configurations of each file
files.forEach(input => {
  const parts = input.split("/")
  const relativePathIndex = parts.indexOf("src")
  const relativePath = parts.slice(relativePathIndex + 1).join("/")

  const plugins = [
    resolve(),
    commonjs(),
    postcss({
      modules: false,
      extract: false,
      inject: false,
      minimize: true,
    }),
  ]

  if (process.env.BABEL_ENV === "prod") plugins.push(terser())

  // Get both cjs and esm configs
  const newConfigs = formats.map(format => {
    return {
      external,
      input,
      plugins,
      output: {
        format,
        file: path.resolve(`lib/${format}/${relativePath}`),
      },
    }
  })

  configs.push(...newConfigs)
})

export default configs
