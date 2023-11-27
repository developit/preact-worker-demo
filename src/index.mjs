import dom from './renderer/dom.mjs';

const worker = new Worker('./app.mjs', { type: 'module' });
dom({ worker });
