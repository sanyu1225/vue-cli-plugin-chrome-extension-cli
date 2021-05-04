# vue-cli-plugin-chrome-extension-cli

[English](./README.md) | [简体中文](./README-zh_CN.md) | 繁體中文

[![npm version](https://badge.fury.io/js/vue-cli-plugin-chrome-ext.svg)](https://www.npmjs.com/package/vue-cli-plugin-chrome-ext)

使用 Vue-CLI 輕鬆建構 chrome 插件

支援 vue2 vue3 TypeScript 跟 JavaScript!

## 安裝

該插件用於將新專案 用於 chrome extension 插件。

## 使用方法?

```
vue create <project-name>
# 回答要建構的vue專案問答
cd <project-name>
vue add vue-cli-plugin-chrome-ext
# 回答要建構的chrome extension問答
# 🎉
```

### 本地開發 跟 生產模式

- 使用` npm run build-watch`運行開發模式，將生成一個`dist`文件。 安裝[Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)，以便在熱更新。 （注意，當您更改 manifest.json 文件時，它不會自動加載，您需要點選 extension 頁面中的更新）

- 生產模式 `npm run build`，並將其壓縮成 zip 並部署到 chrome 商店中。

## 開發

### 測試

#### Development

當前，使用文件手動完成測試`./auto.sh`，通過`-r`指令，它將刪除生成的初始文件。

#### Production

測試 npm 上的版本 可以執行 `./prod.sh`

### prompts.js

對話都是通過[inquirer.js](https://github.com/SBoudrias/Inquirer.js) api.實現

## Credit

- https://github.com/zwenza/vue-cli-plugin-build-watch
- https://github.com/RequireSun/vue-cli-plugin-chrome-extension
- https://github.com/superoo7/vue-cli-plugin-chrome-ext

## License

MIT
