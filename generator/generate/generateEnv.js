const generateEnv = (path, componentsName) => {
  let str = ''
  componentsName.forEach(value => {
    if (value === componentsName[componentsName.length - 1]) {
      str += value
    } else {
      str += value + ','
    }
  })
  const fs = require('fs')
  const envValue = `VUE_APP_FILE=${str}`
  // generate env file
  fs.writeFileSync(
    `${path}/.env`,
    envValue,
    {
      encoding: 'utf-8'
    }
  )
}

module.exports = generateEnv
