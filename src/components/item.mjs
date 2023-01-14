import { Component } from '../deps/preact.mjs';
import { html } from '../lib/htm.mjs';

export default class Item extends Component {
	toggle = e => {
		console.log('toggle', e);
		this.setState({ selected: !this.state.selected });
	};

	render({ name, unread }, { selected }) {
		let start = Date.now();
		while (Date.now()-1 < start);
		return html`
			<div class=${'item item-icon-left' + (unread?' item-icon-right':'')} onClick=${this.toggle} style=${selected ? 'background:#EEE;' : ''}>
				<i class=${'icon ' + (selected ? 'ion-checkmark-circled' : 'ion-chatbubble')} />
				${ name }
				${ unread ? (
					html`<span class="badge badge-royal unread">${unread}</span>`
				) : null }
			</div>
		`;
	}
}
