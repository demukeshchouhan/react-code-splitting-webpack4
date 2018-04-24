const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const VENDORS = [
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "redux-thunk"
];

module.exports = {
  mode: "development",
  entry: {
    bundle: "./src/index.js",
    vendor: VENDORS
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "--[hash:base64:8]"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
    inline: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
};
