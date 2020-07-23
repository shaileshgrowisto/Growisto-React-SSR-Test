import React, { createContext } from 'react';
import { Response } from 'express';
import { Stream } from 'stream';

const inithtml = ({ helmet, extractor }) =>
  `<html ${helmet.htmlAttributes.toString()}><head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  ${extractor.getLinkTags()}
  ${extractor.getStyleTags()}
  </head>
  <body ${helmet.bodyAttributes.toString()}><div id='root'>`;

function render({ res, html, data, helmet, extractor }) {
  res.write(inithtml({ helmet, extractor }));
  res.write(html);
  res.write(`</div><script>
    window._INITIAL_DATA_ = ${JSON.stringify(data)}
    </script>`);
  res.write(extractor.getScriptTags());
  res.write(`</body></html>`);
}

export default render;
