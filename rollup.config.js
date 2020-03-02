import glob from "glob"
import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"

const configs = []
const external = []
const formats = ["esm", "cjs"]

const files = glob.sync(path.resolve(__dirname, "src/**/*.js"))

files.forEach(filePath => {
  const parts = filePath.split("/")
  const name = parts[parts.length - 1].slice(0, -3)
  if (!name.includes("index")) external.push(`./${name}`, `../${name}`, `../../${name}`)
})

files.forEach(filePath => {
  const parts = filePath.split("/")
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

  const newConfigs = formats.map(format => {
    return {
      external,
      input: filePath,
      output: {
        format,
        file: path.resolve(`lib/${format}/${relativePath}`),
      },
      plugins,
    }
  })

  configs.push(...newConfigs)
})

export default configs
