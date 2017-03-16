/*
 *
 * AppRoot
 *
 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

class AppRoot extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { store, children } = this.props;
    return (
      <Provider store={store}>
        {React.Children.only(children)}
      </Provider>
    );
  }
}

export default AppRoot;
