/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const copyHTMLTemplate = new HtmlWebpackPlugin({
  template: "template/index.html"
});

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env",
              "react"
            ],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'), 
              require('babel-plugin-transform-class-properties'),
            ],
          }
        },
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 5000 }
          },
          "image-webpack-loader"
        ]
      }
    ]
  },
  plugins: [
    copyHTMLTemplate,
    extractSass,
  ]
};

module.exports = config;