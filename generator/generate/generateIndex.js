const generateIndexFile = async (api, vueVersion = 3, isTypeScript, componentsName, name) => {
  const fs = require('fs')

  /** devtools should add chrome api */
  function addDevToolsFnc (api, isTypeScript, name) {
    api.afterInvoke(() => {
      const { EOL } = require('os')
      const fs = require('fs')
      const path = `./src/entry/devtools.${isTypeScript ? 'ts' : 'js'}`
      const contentMain = fs.readFileSync(path, { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g)

      // const renderIndex = lines.findIndex(line => line.match(/render/))
      lines[2] += `chrome.devtools.panels.create('${name}', '', 'devtools.html')`

      fs.writeFileSync(path, lines.join(EOL), { encoding: 'utf-8' })
    })
  }

  // genrate options or popup vue index and vue file
  async function createVueFile (api, vueVersion, isTypeScript, componentsName) {
    // vue index
    const renderPath = `./src/entry/${componentsName}.${isTypeScript ? 'ts' : 'js'}`
    const renderTemplate = `../template/vueIndex/vue${vueVersion}Index.js`
    // vue file
    const renderVuePath = `./src/view/${componentsName}.vue`
    const renderVueTemplate = `../template/vueFile/${componentsName}.vue`
    api.render({
      [renderPath]: renderTemplate,
      [renderVuePath]: renderVueTemplate
    })
  }

  switch (componentsName) {
    // just only script file
    case 'background':
    case 'content':
      fs.writeFileSync(
        `src/entry/${componentsName}.${!isTypeScript ? 'js' : 'ts'}`,
        `console.log('hello world ${componentsName} todo something~')`,
        {
          encoding: 'utf-8'
        }
      )
      break
    case 'options':
    case 'popup':
    case 'devtools':
      // create vueFile and vueIneex
      await createVueFile(api, vueVersion, isTypeScript, componentsName)
      if (componentsName === 'devtools') {
        addDevToolsFnc(api, isTypeScript, name)
      }
      break
    default:
      throw new Error('componentsName was not found!')
  }
}

module.exports = generateIndexFile
