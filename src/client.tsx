import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { history } from '@/state/history';
import App from './app/App';
import routes from './routes';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

const data = window['_INITIAL_DATA_'];

const MainApp = (
  <BrowserRouter>
    <App routes={routes} initialData={data} />
  </BrowserRouter>
);
loadableReady(() => {
  const root = document.getElementById('root');
  ReactDOM.hydrate(MainApp, root);
});
if (
  process.env.NODE_ENV === 'development' &&
  typeof module['hot'] !== 'undefined'
) {
  module['hot'].accept(); /* eslint-disable-line no-undef */
}
