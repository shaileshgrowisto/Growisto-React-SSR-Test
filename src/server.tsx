import { Request, Response } from 'express';
import { Stats } from 'webpack';
/* Reacts */
import * as React from 'react';
import {
  renderToString,
} from 'react-dom/server';
/* Reacts End */

const isObject = require('is-object');

import App from './app/App';
import { StaticRouter, matchPath } from 'react-router';
import { Helmet } from 'react-helmet';
import * as path from 'path';
import render from './core/html.string';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
export const promises = [];

export default ({ clientStats }: { clientStats: Stats }) => async (
  req: Request,
  res: Response
) => {
  const helmet = Helmet.renderStatic();
  // Now we pull out all the promises we found into an array.

  const nodeStats = path.resolve('./dist/server/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({
    statsFile: nodeStats,
  });
  const entry = nodeExtractor.requireEntrypoint();
  const clientStats = path.resolve('./dist/client/loadable-stats.json');
  const webExtractor = new ChunkExtractor({
    statsFile: clientStats,
  });

  const context: any = {};

  res.status(200);

  if (process.env.APPLICATE_ENVIRONMENT != 'production') {
    res.setHeader('X-Robots-Tag', 'none');
  }

  res.setHeader('Content-Type', 'text/html');

  const props: any = {};
  const MainApp = (
    <ChunkExtractorManager extractor={webExtractor}>
      <StaticRouter context={context} location={req.url}>
        <App {...props} />
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const html = renderToString(MainApp);
  res.status(context.status || 200);
  render({ res, html, data: {}, helmet, extractor: webExtractor });
  res.end();
};
