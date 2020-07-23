import * as React from 'react';
import {
  withRouter,
} from 'react-router';

import '../style.scss';

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

export default withRouter(App);
