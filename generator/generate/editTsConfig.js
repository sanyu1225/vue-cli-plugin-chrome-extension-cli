const editTsConfig = (path) => {
  const fs = require("fs");
  const tsconfigPath = `${path}/tsconfig.json`;

  function updateTsConfig(json) {
    console.log("write file");
    fs.writeFileSync(tsconfigPath, JSON.stringify(json, null, 4), {
      encoding: "utf-8",
    });
  }

  console.log(fs.existsSync(tsconfigPath));

  if (fs.existsSync(tsconfigPath)) {
    let userConfig = fs.readFileSync(tsconfigPath);

    userConfig = JSON.parse(userConfig);

    let newConfig = userConfig;

    //No compilerOptions before
    if (!userConfig.hasOwnProperty("compilerOptions")) {
      newSettings = {
        ...userConfig,
        ...{
          compilerOptions: {
            types: ["chrome"],
          },
        },
      };
      updateTsConfig(newConfig);
      return;
    }

    //Have compilerOptions before and have types options already
    if (userConfig.compilerOptions.hasOwnProperty("types")) {
      //Push chrome types in it
      userConfig.compilerOptions.types.push("chrome");
      updateTsConfig(newConfig);
      return;
    }

    //Have compilerOptions before and but no types options before
    userConfig.compilerOptions.types = ["chrome"];
    updateTsConfig(newConfig);
    return;
  }
};

module.exports = editTsConfig;
