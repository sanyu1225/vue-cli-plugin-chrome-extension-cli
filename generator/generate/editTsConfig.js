const fs = require('fs')

module.exports = (path) => {
  if (!fs.existsSync(path)) return

  function updateTsConfig (json) {
    fs.writeFileSync(path, JSON.stringify(json, null, 4), {
      encoding: 'utf-8'
    })
  }

  const tsConfigFile = fs.readFileSync(path)
  const tsConfigJson = JSON.parse(tsConfigFile)

  // No compilerOptions before
  if (!tsConfigJson.hasOwnProperty('compilerOptions')) {
    const newConfig = {
      ...tsConfigJson,
      ...{
        compilerOptions: {
          types: ['chrome']
        }
      }
    }
    updateTsConfig(newConfig)
    return
  }

  // Have compilerOptions before and have types options already
  if (tsConfigJson.compilerOptions.hasOwnProperty('types')) {
    // Push chrome types
    tsConfigJson.compilerOptions.types.push('chrome')
    updateTsConfig(tsConfigJson)
    return
  }
  // Have compilerOptions before and but no types options before
  tsConfigJson.compilerOptions.types = ['chrome']
  updateTsConfig(tsConfigJson)
}
