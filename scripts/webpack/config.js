exports.tsrule = ({ target }) => ({
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        caller: { target },
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
});
