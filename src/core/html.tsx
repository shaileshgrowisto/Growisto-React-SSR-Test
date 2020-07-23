import React, { createContext } from 'react';
import { Response } from 'express';
import { Stream } from 'stream';

function HTML({ helmet, extractor, Main, data = {} }) {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {/* {style} */}
        {extractor.getStyleElements()}
        {extractor.getLinkElements()}
      </head>
      <body {...bodyAttrs}>
        <div id='root'>{Main}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window._INITIAL_DATA_ = ${JSON.stringify(data)}`,
          }}
        ></script>
        {extractor.getScriptElements()}
      </body>
    </html>
  );
}

export default HTML;
