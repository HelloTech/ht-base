import React from 'react'
import {Switch, Route} from 'react-router'
import * as Routes from '../lib/Route'
const NoMatch = ({location}) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} failed!!!!!!!!!!!</p>
  </div>
);

import Layout from './layout/index'

const Root = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Routes.WelcomePage}/>
      <Route path="/about" component={Routes.AboutPage}/>
      <Route path="/imprint" component={Routes.ImprintPage}/>
      <Route component={NoMatch}/>
    </Switch>
  </Layout>
);

export default Root;
