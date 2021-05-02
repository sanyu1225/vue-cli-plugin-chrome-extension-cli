# vue-cli-plugin-chrome-extension-new

[English](./README.md) | 简体中文 | [繁體中文](./README-zh_TW.md)

使用 Vue-CLI 轻松建构 chrome 扩展插件

支援 vue2 vue3 TypeScript 跟 JavaScript!

## 安裝

该插件用于将新项目用于 chrome 扩展。

## 使用方法?

```
vue create <project-name>
# 回答要建构的vue专案问答
cd <project-name>
vue add vue-cli-plugin-chrome-ext
# 回答要建构的chrome extension问答
# 🎉
```

### 本地开发 跟 生产模式

- 使用` npm run build-watch`运行开发模式，将生成一个`dist`文件。 安装[Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)，以便在热更新。 （注意，当您更改 manifest.json 文件时，它不会自动加载，您需要点选 extension 页面中的更新）

- 生产模式 `npm run build`，并将其压缩成 zip 并部署到 chrome 商店中。

## 開發

### 測試

#### Development

当前，使用文件手动完成测试`./auto.sh`，通过`-r`指令，它将删除生成的初始文件。

#### Production

测试 npm 上的版本 可以执行 `./prod.sh`

### prompts.js

对话都是通过[inquirer.js](https://github.com/SBoudrias/Inquirer.js) api.实现

## Credit

- https://github.com/zwenza/vue-cli-plugin-build-watch
- https://github.com/RequireSun/vue-cli-plugin-chrome-extension
- https://github.com/superoo7/vue-cli-plugin-chrome-ext

## License

MIT
