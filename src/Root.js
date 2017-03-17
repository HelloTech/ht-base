import React, { PropTypes } from 'react';
import {ConnectedRouter} from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import App from './App';


const Root = ({store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )
};

Root.propTypes = {
  history: PropTypes.object,
};

export default Root
