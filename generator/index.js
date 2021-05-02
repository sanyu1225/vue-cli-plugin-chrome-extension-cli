const generateManifest = require("./generate/manifest");
const generateIndex = require("./generate/generateIndex")
const deleteFile = require("./generate/deleteFile")
const generateEnv = require("./generate/generateEnv")

module.exports = (api, options, { vueVersion }) => {
  const utils = require('./utils')(api)
  const isTypeScript = utils.isTypeScriptProject();
  const { delete_file, components } = options;
  // // create file
  api.render({
    './vue.config.js': './template/vue.config.js'
  });
  // dynamic grenrate (popup background option content) index file
  components.forEach(e => {
    generateIndex(api, vueVersion, isTypeScript, e);
  });
  const extPkg = {
    scripts: {
      "build-watch": "vue-cli-service build-watch --mode development"
    },
    devDependencies: {
      "copy-webpack-plugin": "^4.6.0"
    }
  };

  if (isTypeScript) {
    extPkg.devDependencies = {
      ...extPkg.devDependencies,
      "@types/chrome": "^0.0.75"
    };
  }
  api.extendPackage(extPkg);

  api.onCreateComplete(() => {
    // add manifest.json
    generateManifest(options, api.resolve("./src"));
    // add env file
    generateEnv(api.resolve("./"), components)
    // delete vue Initial file
    if (delete_file) deleteFile(api.resolve("./"), isTypeScript);

  });
};
