module.exports = (api, opts) => {
  api.chainWebpack(webpackConfig => {
    // remove split chunks for chrome extension, make sure everything in a file
    webpackConfig.optimization.delete('splitChunks')
  })

  api.registerCommand('build-watch', (...args) => {
    api.configureWebpack(webpackConfig => {
      webpackConfig.watch = true
    })
    api.service.run('build', ...args)
  })
}
