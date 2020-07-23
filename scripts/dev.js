const express = require('express');
const webpack = require('webpack');
const clientConfig = require('./webpack/dev.client.config');
const serverConfig = require('./webpack/dev.server.config');

const appPromise = new Promise((resolve, reject) => {
  try {
    const app = express();

    let resolved = false;
    const done = () => {
      if (!resolved) {
        resolved = true;
        resolve(app);
      }
    };

    //   app.use(compression())
    app.use(express.static('public'));
    app.get('/ping', (_req, res) => res.status(200).send('ok'));

    const { path: outputPath, publicPath } = clientConfig.output;

    if (process.env.NODE_ENV !== 'production') {
      const compiler = webpack([clientConfig, serverConfig]);
      const clientCompiler = compiler.compilers[0];
      const options = {
        publicPath,
        stats: { colors: true },
        logLevel: 'error',
        writeToDisk(filePath) {
          return (
            /dist\/server\//.test(filePath) || /loadable-stats/.test(filePath)
          );
        },
      };

      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');
      const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

      app.use(
        webpackDevMiddleware(compiler, { ...options, serverSideRender: true })
      );
      app.use(webpackHotMiddleware(clientCompiler));
      app.use(webpackHotServerMiddleware(compiler));

      compiler.plugin('done', done);
    } else {
      webpack([clientConfig, serverConfig]).run((_err, stats) => {
        const clientStats = stats.toJson().children[0];
        const serverRender = require('../dist/server/main').default;
        app.use(publicPath, express.static(outputPath));
        app.use(serverRender({ clientStats }));
        done();
      });
    }
  } catch (ex) {
    reject(ex);
  }
});

async function start() {
  try {
    const app = await appPromise;
    const port = process.env.PORT || 8081;
    // tslint:disable-next-line:no-console
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (ex) {
    // tslint:disable-next-line:no-console
    console.error('Error starting server', ex);
  }
}

// // tslint:disable-next-line:no-console
// start().catch((err) => console.error(err));
module.exports = start;
