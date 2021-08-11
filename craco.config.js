const CracoLessPlugin = require("craco-less")

module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#BB78FE' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };