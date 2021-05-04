
const generateIndexFile = (api, vueVersion, isTypeScript, componentsName) => {
    const fs = require("fs");
    const utils = require('../utils')(api)
    // const replaceFileString = utils.replaceFileString;

    // genrate options or popup vue index and vue file
    function createVueFile(api, vueVersion, isTypeScript, componentsName) {
        // vue index
        const renderPath = `./src/entry/${componentsName}.${isTypeScript ? 'ts' : 'js'}`;
        const renderTemplate = `../template/vueIndex/vue${vueVersion}Index.js`;
        // vue file
        const renderVuePath = `./src/view/${componentsName}.vue`;
        const renderVueTemplate = `../template/vueFile/${componentsName}.vue`;
        api.render({
            [renderPath]: renderTemplate,
            [renderVuePath]: renderVueTemplate,
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
                    encoding: "utf-8"
                }
            );
            break;
        case 'options':
        case 'popup':
            // create vueFile and vueIneex
            createVueFile(api, vueVersion, isTypeScript, componentsName)
            break;
        default:
            throw new Error('componentsName was not found!')
    }


};

module.exports = generateIndexFile;
