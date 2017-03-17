import React from 'react';
import {Switch, Route} from 'react-router-dom';
import * as Routes from './route';
import Layout from './containers/layout/index';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import { Provider } from 'react-redux'
// import configureStore from './store'
// const store = configureStore();

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Routes.HomePage}/>
        <Route path='/login' component={Routes.LoginPage}/>
        <Route path='/tech-support/for' component={Routes.SkuPage}/>
        <Route path='/tech-support/category' component={Routes.SkuCategoryPage}/>
        <Route path='/plans' component={Routes.PlansPage}/>
        <Route path='/plans/:name' component={Routes.PlanPage}/>
        <Route component={Routes.NotFoundPage}/>
      </Switch>
    </Layout>
  );
};

export default App;
