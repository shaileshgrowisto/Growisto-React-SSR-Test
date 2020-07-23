const { resolve } = require('./helper');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.server.config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  name: 'server',
  target: 'node',
  mode: 'development',
  entry: [`./src/server.tsx`],
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: resolve('dist/server'),
    publicPath: `/dist/server/`,
  },
  plugins: [new LoadablePlugin()],
  node: { fs: 'empty' },
});
