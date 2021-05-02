const fs = require('fs')

module.exports = api => {
    return {
        isTypeScriptProject() {
            const tsPath = api.resolve('src/main.ts')
            return fs.existsSync(tsPath)
        },
        getMain() {
            return this.isTypeScriptProject() ? 'src/main.ts' : 'src/main.js'
        },

    }
}