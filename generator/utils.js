const fs = require('fs')

module.exports = api => {
  return {
    isTypeScriptProject () {
      const tsPath = api.resolve('src/main.ts')
      return fs.existsSync(tsPath)
    },
    getMain () {
      return this.isTypeScriptProject() ? 'src/main.ts' : 'src/main.js'
    },
    replaceFileString (path, regex, searchValue, replaceValue) {
      const { EOL } = require('os')
      const contentMain = fs.readFileSync(api.resolve(path), { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g)
      const renderIndex = lines.findIndex(line => line.match(regex))
      lines[renderIndex] = lines[renderIndex].replace(searchValue, replaceValue)
      fs.writeFileSync(api.resolve(path), lines.join(EOL), { encoding: 'utf-8' })
    }
  }
}
