const { resolve } = require('./helper');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.client.config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  name: 'client',
  entry: [
    // 'react-hot-loader/patch', // RHL patch
    `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=false&noInfo=false`,
    `./src/client.tsx`,
  ],
  output: {
    path: resolve('dist/client'),
    filename: '[name].js',
    publicPath: `/dist/client/`,
  },
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: `!!handlebars-loader!src/apps/${app}/index.html`,
    // }),
    new LoadablePlugin(),
    new webpack.EnvironmentPlugin({
      IS_BROWSER: 'true',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: { fs: 'empty' },
});
