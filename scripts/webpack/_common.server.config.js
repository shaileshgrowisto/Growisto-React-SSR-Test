const { resolve } = require('./helper');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: { target: 'node' },
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less|scss)$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  externals: ['@loadable/component', nodeExternals()],
  plugins: [],
};
