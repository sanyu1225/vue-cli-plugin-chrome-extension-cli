const generateManifest = require('./generate/manifest')
const generateIndex = require('./generate/generateIndex')
const deleteFile = require('./generate/deleteFile')
const editTsConfig = require('./generate/editTsConfig')
const editPackage = require('./generate/editPackage')
const fs = require('fs')

module.exports = async (api, options, { vueVersion }) => {
  const utils = require('./utils')(api)
  const isTypeScript = utils.isTypeScriptProject()
  const replaceFileString = utils.replaceFileString
  const { deleteInitFile, components, name } = options
  // create file and empty folder
  api.render({
    './vue.config.js': './template/vue.config.js'
  })

  // create empty entry folder
  fs.mkdir(`src/entry`, (err) => {
    if (err) console.log('create entry folder error')
  })

  // dynamic generate components
  components.forEach((e) => {
    generateIndex(api, vueVersion, isTypeScript, e, name)
  })

  // extendPackage
  editPackage(api, isTypeScript)

  api.onCreateComplete(() => {
    generateManifest(options, api.resolve('./src')) // add manifest.json
    // edit tsconfig.json
    if (isTypeScript) editTsConfig(api.resolve('./tsconfig.json'))
    // delete vue Initial file
    if (deleteInitFile) deleteFile(api.resolve('./'), isTypeScript)
  })

  // Modify file content
  api.afterInvoke(() => {
    components.forEach((e) => {
      const whiteList = ['popup', 'options', 'devtools']
      if (whiteList.includes(e)) {
        const renderPath = `./src/entry/${e}.${isTypeScript ? 'ts' : 'js'}`
        replaceFileString(renderPath, /App\.vue/, 'App.vue', `../view/${e}.vue`)
      }
    })
  })
}
