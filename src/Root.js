import React from 'react'
// import {ConnectedRouter} from 'react-router-redux'
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import {Provider} from 'react-redux'
// import configureStore from '../store';

import {Switch, Route} from 'react-router-dom';
import * as Routes from './route';
import Layout from './containers/layout/index';
// import App from './App'



const Root = () =>(
    <div>
        <Route exact path='/' component={Routes.HomePage}/>
        <Route path='/login' component={Routes.LoginPage}/>
        <Route path='/tech-support/for' component={Routes.SkuPage}/>
        <Route path='/tech-support/category' component={Routes.SkuCategoryPage}/>
        <Route path='/plans' component={Routes.PlansPage}/>
        <Route path='/plans/:name' component={Routes.PlanPage}/>
        <Route component={Routes.NotFoundPage}/>
    </div>
);

export default Root
