import './style';
import dom from './renderer/dom';
import spawnWorker from 'worker-loader!./app';

let worker = spawnWorker();
dom({ worker });
