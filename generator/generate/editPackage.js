
module.exports = (api, isTypeScript) => {
  const extPkg = {
    scripts: {
      'build-watch': 'vue-cli-service build-watch --mode development'
    },
    devDependencies: {
      'copy-webpack-plugin': '^4.6.0'
    },
    eslintConfig: {
      env: {
        webextensions: true
      }
    }
  }

  if (isTypeScript) {
    extPkg.devDependencies = {
      ...extPkg.devDependencies,
      '@types/chrome': '^0.0.75'
    }
  }

  api.extendPackage(extPkg)
}
