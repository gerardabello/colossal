
'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

////

import '../static/sass/main.scss';

var React = require('react');
var ReactDOM = require('react-dom');

import App from './app.jsx';

ReactDOM.render(<App/>, document.getElementById('react-root'));
