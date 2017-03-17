import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import NoticeStack from '../../components/NoticeStack';
import Helmet from "react-helmet"


import { loadUser } from './actions';

const AppWrapper = styled.div`
  height: 100%;
`;

class Layout extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    loadUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Layout title"
          meta={[
            { name: "description", content: "Layout description" },
            { name: "robots", content: "noodp, noydir" },
            { name: "lang", content: "de" },
            { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" }
          ]}
        />
        <AppWrapper>
          <TopNav />
          <Sidebar />
          <NoticeStack />
          {React.Children.toArray(this.props.children)}
        </AppWrapper>
      </div>
    );
  }
}

export default connect(null, { loadUser })(Layout);
