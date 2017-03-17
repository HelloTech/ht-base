import React from 'react';
import {Switch, Route} from 'react-router';
import NavBar from '../components/NavBar';
import HomePage from '../containers/HomePage/index';

const NoMatch = ({location}) => (
  <div>
    <h2>Whoops!</h2>
    <p>Sorry but {location.pathname} failed!!!!!!!!!!!</p>
  </div>
);

const routes = ()=> {
  console.log(this);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  );
};

export default routes;

