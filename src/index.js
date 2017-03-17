import React from 'react';
import { render } from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Root from './Root';
import { createBrowserHistory } from 'history'
import configureStore from './store'

const history = createBrowserHistory();

const store = configureStore({}, history);
// render the first time
render(<Root store={store} history={history}/>, document.getElementById('app'));

OfflinePluginRuntime.install();
