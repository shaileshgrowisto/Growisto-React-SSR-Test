const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./helper');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.client.config');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          name: 'vendor',
          // async + async chunks
          chunks: 'all',
          priority: 20,
          // import file path containing node_modules
          test: /node_modules/,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  mode: 'production',
  name: 'client',
  entry: `./src/apps/${app}/index.tsx`,
  output: {
    publicPath: `/static/${app}`,
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
    path: resolve('dist/' + app),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: `!!handlebars-loader!src/apps/${app}/index.html`,
    // }),
    new webpack.EnvironmentPlugin({
      IS_BROWSER: 'true',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new webpack.DefinePlugin(weback_define_variables.prod_client),
    new CopyWebpackPlugin([{ from: 'src/favicon.ico', to: 'favicon.ico' }], {
      copyUnmodified: true,
    }),
  ],
});
