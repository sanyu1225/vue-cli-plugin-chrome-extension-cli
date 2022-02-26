const generateManifest = (options, manifestPath) => {
  const fs = require('fs')
  const { version_no: version, manifest_version, description, name, components } = options
  const manifestJson = {
    manifest_version,
    name,
    description,
    version
  }
  const mf2_Key = {
    'background': 'background',
    'popup': 'browser_action',
    'content': 'content_scripts',
    'options': 'options_page',
    'devtools': 'devtools_page'
  }
  const mf3_Key = {
    'background': 'background',
    'popup': 'action',
    'content': 'content_scripts',
    'options': 'options_page',
    'devtools': 'devtools_page'
  }
  const mf3_content = {
    'background': {
      'service_worker': '/js/background.js'
    },
    'action': {
      'default_popup': 'popup.html'
    },
    'content_scripts': [{
      'matches': ['<all_urls>'],
      'js': ['/js/content.js']
    }],
    'options_page': 'options.html',
    'devtools_page': 'devtools.html'
  }
  const mf2_content = {
    'background': {
      'scripts': ['/js/background.js'],
      'persistent': false
    },
    'browser_action': { default_popup: 'popup.html' },
    'content_scripts': [{
      'matches': ['<all_urls>'],
      'js': ['/js/content.js']
    }],
    'options_page': 'options.html',
    'devtools_page': 'devtools.html'
  }
  if (manifest_version === 3) {
    components.forEach(element => {
      manifestJson[mf3_Key[element]] = mf3_content[mf3_Key[element]]
    })
  } else {
    components.forEach(element => {
      manifestJson[mf2_Key[element]] = mf2_content[mf2_Key[element]]
    })
    // Development build of manifest.json
    manifestJson['content_security_policy'] =
    "script-src 'self' 'unsafe-eval'; object-src 'self'"
  }

  // Production build of manifest.json
  fs.writeFileSync(
    `${manifestPath}/manifest.production.json`,
    JSON.stringify(manifestJson, null, 4),
    {
      encoding: 'utf-8'
    }
  )

  fs.writeFileSync(
    `${manifestPath}/manifest.development.json`,
    JSON.stringify(manifestJson, null, 4),
    {
      encoding: 'utf-8'
    }
  )
}

module.exports = generateManifest
