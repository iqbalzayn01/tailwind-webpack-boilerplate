const path = require("path");
const fs = require("fs");
const environment = require("./config/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const templateFiles = fs.readdirSync(
  path.resolve(__dirname, environment.paths.source, "templates")
);

const generateHtmlPlugins = templateFiles.map(
  (template) =>
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      template: path.resolve(environment.paths.source, "templates", template),
      favicon: path.resolve(environment.paths.source, "images", "favicon.ico"),
    })
);

module.exports = {
  entry: {
    main: path.resolve(environment.paths.source, "js", "index.js"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [].concat(generateHtmlPlugins),
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  target: "web",
};
