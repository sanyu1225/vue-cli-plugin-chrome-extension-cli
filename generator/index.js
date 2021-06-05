const generateManifest = require("./generate/manifest");
const generateIndex = require("./generate/generateIndex")
const deleteFile = require("./generate/deleteFile")
const generateEnv = require("./generate/generateEnv")
const fs = require("fs");

module.exports = async (api, options, { vueVersion }) => {
  const utils = require('./utils')(api)
  const isTypeScript = utils.isTypeScriptProject();
  const replaceFileString = utils.replaceFileString;
  const { delete_file, components } = options;
  // // create file and empty folder
  api.render({
    './vue.config.js': './template/vue.config.js'
  });
  // create empty entry folder
  fs.mkdir(`src/entry`, (err) => {
    if (err) console.log('create entry folder error');
  })
  // dynamic grnerate components
  components.forEach(e => {
    generateIndex(api, vueVersion, isTypeScript, e);
  });

  const extPkg = {
    scripts: {
      "build-watch": "vue-cli-service build-watch --mode development"
    },
    devDependencies: {
      "copy-webpack-plugin": "^4.6.0"
    },
    eslintConfig: {
      env: {
        "webextensions": true
     }
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
  // Modify file content
  api.afterInvoke(() => {
    if (isTypeScript) {
      replaceFileString("./vue.config.js", /\{name\}\.js/, '{name}.js', '{name}.ts')
    }
    components.forEach(e => {
      const whiteList = ['popup','options','devtools']
      if (whiteList.includes(e)) {
        console.log('in whiteList',e);
        const renderPath = `./src/entry/${e}.${isTypeScript ? 'ts' : 'js'}`;
        replaceFileString(renderPath, /App\.vue/, 'App.vue', `../view/${e}.vue`)
      }
    });
  })
};
