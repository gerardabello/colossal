const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/main.jsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Colossal',
      template: './index.template.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    port: 5050
  }
}
