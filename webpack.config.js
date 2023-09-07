const path = require("path");
const fs = require("fs");
const environment = require("./config/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
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
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(environment.paths.source, "images", "content"),
    //       to: path.resolve(environment.paths.output, "images", "content"),
    //       toType: "dir",
    //       globOptions: {
    //         ignore: ["*.DS_Store", "Thumbs.db"],
    //       },
    //     },
    //   ],
    // }),
  ].concat(generateHtmlPlugins),
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
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
        ],
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
