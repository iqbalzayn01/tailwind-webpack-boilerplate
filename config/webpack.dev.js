const path = require("path");
const environment = require("./env");
const config = require("../webpack.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
  mode: "development",
  devtool: "eval",
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist/"),
      publicPath: "/",
    },
    open: false,
    hot: false,
    compress: true,
    liveReload: true,
    ...environment.server,
  },
  output: {
    path: environment.paths.output,
    filename: "js/[name].js",
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
  ],
});
