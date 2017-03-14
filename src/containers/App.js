import React from 'react'
import {Switch, Route } from 'react-router'

import Layout from './layout/index'
import AsyncRoute from '../lib/AsyncRoute'
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
      <Route
        exact path="/about"
        component={
          (props) =>{
            return (<AsyncRoute props={props} loadingPromise={System.import('./pages/about')}/>)
          }
        } />
      <Route
        exact path="/imprint"
        component={
          (props) =>{
            return (<AsyncRoute props={props} loadingPromise={System.import('./pages/imprint')}/>)
          }
        } />
      <Route component={NoMatch}/>
    </Switch>
  </Layout>
);

export default App
