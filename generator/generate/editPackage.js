
module.exports = (api, isTypeScript) => {
  const extPkg = {
    scripts: {
      'build-watch': 'vue-cli-service  --env.NODE_ENV=development build-watch --mode development'
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
      '@types/chrome': '^0.0.179'
    }
  }

  api.extendPackage(extPkg)
}
