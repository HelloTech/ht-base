import React from 'react';
import { render } from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Root from './containers/Root';

render(<Root />, document.getElementById('app'));

OfflinePluginRuntime.install();
