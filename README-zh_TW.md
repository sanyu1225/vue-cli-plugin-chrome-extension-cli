# vue-cli-plugin-chrome-extension-cli

[English](./README.md) | [简体中文](./README-zh_CN.md) | 繁體中文

<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://github.com/sanyu1225/vue-cli-plugin-chrome-extension-cli/raw/main/logo.png" alt="Vue logo"></a></p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-cli-plugin-chrome-extension-cli"><img src="https://img.shields.io/github/package-json/v/sanyu1225/vue-cli-plugin-chrome-extension-cli" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-cli-plugin-chrome-extension-cli"><img src="https://img.shields.io/github/license/sanyu1225/vue-cli-plugin-chrome-extension-cli" alt="License"></a>
</p>

使用 Vue-CLI 輕鬆建構 chrome 插件

支援 vue2 vue3 TypeScript 跟 JavaScript!
## 版本要求
vue-cli 5.0.1 或更高 
## 安裝

該插件用於將新專案 用於 chrome extension 插件。

![](https://sanyu1225.github.io/images/shell.gif)

## 使用方法?

```
vue create <project-name>
# 回答要建構的vue專案問答
cd <project-name>
vue add chrome-extension-cli
# 回答要建構的chrome extension問答
# 🎉
```

## 資料夾結構

```
.
├── public
│   ├──  can set image.
├── src/
│   ├── assets
│   │   └── Static assets
│   ├── entry
│   │   ├── options.js
│   │   ├── popup.js
|   |   ├── devtools.js
│   │   ├── content.js
│   │   └── background.js
│   └── view
│   │   ├── popup.vue
│   │   ├── options.vue
|   |   └── devtools.vue
│   ├── manifest.development.json
│   └── manifest.production.json
└── vue.config.js
```

### 本地開發 跟 生產模式

- 使用` npm run build-watch`運行開發模式，將生成一個`dist`文件。 安裝[Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)，以便在熱更新。 （注意，當您更改 manifest.json 文件時，它不會自動加載，您需要點選 extension 頁面中的更新）

- 生產模式 `npm run build`，並將其壓縮成 zip 並部署到 chrome 商店中。

### prompts.js

對話都是通過[inquirer.js](https://github.com/SBoudrias/Inquirer.js) api.實現

## Credit

- https://github.com/zwenza/vue-cli-plugin-build-watch
- https://github.com/RequireSun/vue-cli-plugin-chrome-extension
- https://github.com/superoo7/vue-cli-plugin-chrome-ext

## License

[MIT](https://opensource.org/licenses/MIT)
