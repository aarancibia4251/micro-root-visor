const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "tdp",
    projectName: "root-config",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    entry: {
      index: path.resolve(__dirname, "src") + "/telefonica-root-config.ts",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from:
              "src/import-maps/import-map." +
              webpackConfigEnv.importMap +
              ".json",
            to: "import-map.json",
          },
          {
            from:
              "src/web.config",
            to: "web.config",
          },
          {
            from: "src/assets",
            to: "assets",
          },
        ],
      }),
    ],
  });
};
