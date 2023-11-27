import './renderer/worker.mjs';
import { h, render } from './deps/preact.mjs';
import App from './components/app.mjs';

render(h(App), document.body);
