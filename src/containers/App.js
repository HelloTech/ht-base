import React from 'react'
import {Switch, Route } from 'react-router'

import Layout from './layout/index'
import AsyncRoute from '../lib/AsyncRoute'
import AboutPage from './pages/about'
import ImprintPage from './pages/imprint'
if(global){
  global.System = { import () {}}
}

const NoMatch = ({location}) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} failed!!!!!!!!!!!</p>
  </div>
);

const App = () => (
  <Layout>
    <Switch>
      <Route
        exact path="/"
        component={
          (props) =>{
            return (<AsyncRoute props={props} loadingPromise={System.import('./pages/welcome')}/>)
          }
        } />
      <Route path="/about" component={AboutPage} />
      <Route path="/imprint" component={ImprintPage} />
      <Route component={NoMatch}/>
    </Switch>
  </Layout>
);

export default App
