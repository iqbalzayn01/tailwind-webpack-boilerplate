const path = require("path");
const config = require("../config/webpack.config.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    open: true,
    hot: false,
    compress: true,
    port: 8080,
    liveReload: true,
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "js/[name].js",
    assetModuleFilename: "img/[name][ext]",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
  ],
});
