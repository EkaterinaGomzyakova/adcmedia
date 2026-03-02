const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dev_build',
    historyApiFallback: {
      rewrites: [
        { from: /^\/interviews\/.*\.html$/, to: '/interviews/article.html' },
        { from: /^\/interview\/.*\.html$/, to: '/interview/single.html' },
        { from: /^\/useful\/.*\.html$/, to: '/useful/article.html' }
      ]
    }
  },
  output: {
    path: path.resolve(__dirname, 'dev_build'),
    publicPath: '/'
  }
})
