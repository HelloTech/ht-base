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



// import React from 'react'
// import Helmet from "react-helmet"
//
// import { Link } from 'react-router-dom'
//
// const Layout = ({children}) => (
//   <div>
//
//     <nav>
//       <ul>
//         <li><Link to="/">Welcome Page</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/imprint">Imprint</Link></li>
//         <li><Link to="/not-matching-route">Not Matching Route</Link></li>
//       </ul>
//       <hr />
//     </nav>
//     <main>{children}</main>
//     <footer>Footer</footer>
//   </div>
// );

// export default Layout
