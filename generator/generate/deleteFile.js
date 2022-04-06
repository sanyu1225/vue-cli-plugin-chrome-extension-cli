const fs = require('fs')

// remove folder all file
const deleteFolderFile = (path) => {
  try {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach(function (file, index) {
        let curPath = path + '/' + file
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolderFile(curPath)
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(path)
    }
  } catch (e) {
    console.log('remove folder error', e)
  }
}

const deleteFile = (path, isTypeScript) => {
  try {
    // remove main.js
    fs.unlinkSync(`${path}/src/main.${isTypeScript ? 'ts' : 'js'}`)
    // remove App.vue
    fs.unlinkSync(`${path}/src/App.vue`)
    // remove components
    deleteFolderFile(`${path}/src/components`)
  } catch (error) {
    console.warn('remove file error', error)
  }
}

module.exports = deleteFile
