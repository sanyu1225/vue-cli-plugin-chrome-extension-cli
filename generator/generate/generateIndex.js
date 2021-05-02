const generateIndexFile = (api, vueVersion, isTypeScript, componentsName) => {
    const fs = require("fs");
    const onlyScriptFile = ['background', 'content']
    // genrate options or popup vue index file
    function createVueIndex() {
        const renderPath = `./src/${componentsName}/index.${isTypeScript ? 'ts' : 'js'}`;
        const renderTemplate = `../template/vueIndex/vue${vueVersion}Index.js`;
        api.render({
            [renderPath]: renderTemplate
        })
    }

    switch (componentsName) {
        case 'background':
        case 'content':
            // just only script file and folder
            fs.mkdir(`src/${componentsName}`, (err) => {
                if (!err) {
                    fs.writeFileSync(
                        `src/${componentsName}/index.${!isTypeScript ? 'js' : 'ts'}`,
                        `console.log('hello world ${componentsName} todo something~')`,
                        {
                            encoding: "utf-8"
                        }
                    );
                } else {
                    console.log('err', err);
                }
            })
            break;
        case 'options':
        case 'popup':
            // create vue file
            api.render(`../template/${componentsName}File`)
            createVueIndex()
            break;
        default:
            throw new Error('componentsName was not found!')
    }


};

module.exports = generateIndexFile;
