module.exports = [{
  name: 'name',
  type: 'input',
  message: 'Name of the Chrome Extension?',
  default: 'chrome-extension-name'
},
{
  name: 'description',
  type: 'input',
  message: 'Description for the Chrome Extension?',
  default: 'chrome extension'
},
{
  name: 'version_no',
  type: 'input',
  message: 'Version for the Chrome Extension?',
  default: '0.0.1'
}, {
  name: 'manifest_version',
  type: 'list',
  message: 'manifest_version for the Chrome Extension?',
  choices: [
    3, 2
  ],
  default: [3]
}, {
  name: 'deleteInitFile',
  type: 'confirm',
  message: 'delete Initial file? (src/main.js src/components)',
  default: true
}, {
  name: 'components',
  message: 'Please select the required components :',
  type: 'checkbox',
  choices: [
    'background',
    'popup',
    'content',
    'options',
    'devtools'
  ],
  default: ['popup', 'content']
}]
