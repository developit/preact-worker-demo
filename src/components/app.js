import { h, Component } from 'preact';
import Item from './item';

const ITEM_COUNT = 200;
const UPDATE_EACH_RENDER = 10;

/** Some fake messaging app type data */
const NAMES = 'Shakira Lucas Norah Erick Gay Rachal Mable Orval Tracie Linh Rhoda Von Sarita Kaye Yanira Carter Hal Jamison Cari Kayleigh Bella Ehtel Latoyia Jenniffer Ryan Loralee Grazyna Roland Andy Billi'.split(' ');

const getName = () => NAMES[Math.random()*.9999*NAMES.length|0];

function createManyItems() {
	let items = [];
	for (let i=0; i<ITEM_COUNT; i++) {
		items.push({
			id: i,
			name: `${getName()} ${getName()}`,
			unread: Math.max(0, Math.random()*20|0-10)
		});
	}
	return items;
}


export default class App extends Component {
	state = {
		items: createManyItems(),
		message: null,
		renderDelay: 0
	};

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	explainWorkerDelay = () => {
		this.setState({
			message: `
				The app running in a worker intentionally blocks for an abnormally long time to simulate an artificially heavy diff.
				Real appliations are unlikely to come anywhere close to a 200ms blocking diff (more like 5ms), but it's fun to show off.
			`.replace(/\t+/g,'').trim()
		});
	};

	closeMessage = () => {
		this.setState({ message: null });
	};

	// increment unread count for a few randomly selected contacts
	next = () => {
		let items = this.state.items.slice();
		for (let i=UPDATE_EACH_RENDER; i--; ) {
			items[Math.random()*items.length|0].unread++;
		}
		this.setState({ items });
	};

	increaseRenderDelay = () => {
		this.setState({ renderDelay: Math.min(1024, (this.state.renderDelay || 1) * 2) });
	};

	decreaseRenderDelay = () => {
		this.setState({ renderDelay: Math.max(0, (this.state.renderDelay || 1)/2|0) });
	};

	// start looping after mount
	componentDidMount() {
		this.timer = setInterval(this.next, 500);
	}

	// track render start time before each render
	componentWillUpdate() {
		this.started = Date.now();
	}

	// after every render, queue another render
	componentDidUpdate() {
		this.elapsed = Date.now()-this.started;
	}

	render(props, { items, message, renderDelay }) {
		if (renderDelay) {
			let start = Date.now();
			while ((Date.now()-start) < renderDelay) {}
		}
		return (
			<div class="app">
				<div class="bar bar-header bar-dark">
					<button class="button icon ion-information-circled" onClick={this.explainWorkerDelay} />
					<h1 class="title">
						Preact in a Worker
					</h1>
					<progress-spinner dark style="margin-left: 10px;" />
				</div>

				<div class="content has-header">
					<div class="list">
						<div class="item item-divider">Info & Options</div>
						<a class="item item-avatar item-icon-right" href="https://github.com/developit/preact" target="_blank">
							<img src="https://preactjs.com/assets/app-icon-192.png" />
							<h2>This Preact app is running in a Web Worker</h2>
							<p>Tap to learn more about Preact</p>
							<i class="icon ion-ios-arrow-forward" />
						</a>
						<div class="item item-checkbox">
							<label class="checkbox">
								<input type="checkbox" id="use-vis" />
							</label>
							Prioritize rendering by visibility
						</div>
						<div class="item item-icon-left">
							<i class="icon ion-clock" />
							<label for="render-delay">Render Delay:</label>
							<div style="display: inline-block; margin:-5px 10px 0;">
								<button class="button button-small button-stable icon-only ion-minus" onClick={this.decreaseRenderDelay} />
								<strong style="display:inline-block; padding:4px; min-width:3em; text-align:center;">{renderDelay}ms</strong>
								<button class="button button-small button-stable icon-only ion-plus" onClick={this.increaseRenderDelay} />
							</div>
						</div>
						<div class="item item-icon-left" onClick={this.explainWorkerDelay}>
							<i class="icon ion-gear-a" />
							Blocked for {this.elapsed != null ? this.elapsed : '...'}ms
						</div>
						<div class="item item-divider">{items.length} Live Items</div>
						{ items.map( item => (
							<Item {...item} />
						)) }
					</div>
				</div>

				<div class={'dialog' + (message?' open':'')} onClick={this.closeMessage}>
					<div class="inner">
						{ message || '' }
					</div>
				</div>
			</div>
		);
	}
}
