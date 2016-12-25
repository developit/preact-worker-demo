import './renderer/worker';
import { h, render } from 'preact';

let root;
function init() {
	let app = require('./components/app');
	root = render(h(app.default || app), document.body, root);
}

if (module.hot) module.hot.accept(['./components/app'], init);

init();
