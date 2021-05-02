const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pages = {};

const chromeName = process.env.VUE_APP_FILE.split(",");

chromeName.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/`,
    template: 'public/index.html',
    filename: `${name}.html`,
  }
})

module.exports = {
  pages,
  filenameHashing: false, //取消打包命名hash
  configureWebpack: {
    plugins: [
      CopyWebpackPlugin([
        {
          from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
          to: `${path.resolve('dist')}/manifest.json`,
        },
      ]),
    ],
    output: {
      filename: `js/[name].js`,
      chunkFilename: `[name].js`,
    },
  },
}
