const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./helper');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.server.config');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  entry: `./src/server.tsx`,
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.js',
    path: resolve(`server/${app}`),
  },
  plugins: [
    // new webpack.DefinePlugin(weback_define_variables.prod_server),
    new CopyWebpackPlugin(
      [
        // { from: `./dist/${app}/index.html`, to: `index.txt` },
        // { from: `./src/sitemap.xml`, to: `sitemap.xml` },
        // { from: `./src/favicon.ico`, to: `favicon.ico` },
      ],
      {
        copyUnmodified: true,
      }
    ),
  ],
  node: { fs: 'empty' },
});
