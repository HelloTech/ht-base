/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import NoticeStack from '../../components/NoticeStack';

import { loadUser } from './actions';

const AppWrapper = styled.div`
  height: 100%;
`;

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    loadUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <AppWrapper>
        <TopNav />
        <Sidebar />
        <NoticeStack />
        {React.Children.toArray(this.props.children)}
      </AppWrapper>
    );
  }
}

export default connect(null, { loadUser })(App);
