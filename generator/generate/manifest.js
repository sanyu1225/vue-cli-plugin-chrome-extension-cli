const generateManifest = (options, manifestPath) => {
  const fs = require('fs')
  const { version_no: version, manifest_version, description, name, components } = options
  const manifestJson = {
    manifest_version,
    name,
    description,
    version
  }

  if (components.includes('background')) {
    manifestJson.background = {
      'scripts': ['/js/background.js'],
      'persistent': false
    }
  }
  if (components.includes('popup')) {
    manifestJson.browser_action = { default_popup: 'popup.html' }
  }
  if (components.includes('content')) {
    manifestJson.content_scripts = [{
      'matches': ['<all_urls>'],
      'js': ['/js/content.js']
    }]
  }
  if (components.includes('options')) {
    manifestJson.options_page = 'options.html'
  }
  if (components.includes('devtools')) {
    manifestJson.devtools_page = 'devtools.html'
  }

  // Production build of manifest.json
  fs.writeFileSync(
    `${manifestPath}/manifest.production.json`,
    JSON.stringify(manifestJson, null, 4),
    {
      encoding: 'utf-8'
    }
  )
  // Development build of manifest.json
  manifestJson['content_security_policy'] =
    "script-src 'self' 'unsafe-eval'; object-src 'self'"
  fs.writeFileSync(
    `${manifestPath}/manifest.development.json`,
    JSON.stringify(manifestJson, null, 4),
    {
      encoding: 'utf-8'
    }
  )
}

module.exports = generateManifest
