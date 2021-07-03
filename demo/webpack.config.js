/**
 * webpack配置
 */
const path = require('path')
const lastReleaseGitInfoPlugin = require('../index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new lastReleaseGitInfoPlugin({
      log: true,
    })
  ]
}
