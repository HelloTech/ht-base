import React from 'react'
import {Switch, Route } from 'react-router'

import Layout from './layout/index'
import WelcomePage from './pages/welcome'
import AboutPage from './pages/about'
import ImprintPage from './pages/imprint'

const Root = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/imprint" component={ImprintPage} />
      <Route component={NoMatch}/>
    </Switch>
  </Layout>
);

export default Root

const NoMatch = ({location}) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} failed!!!!!!!!!!!</p>
  </div>
);
