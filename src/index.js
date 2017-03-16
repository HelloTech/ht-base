import React from 'react';
import { render } from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Root from './Root';

render(<Root />, document.getElementById('app'));

OfflinePluginRuntime.install();
