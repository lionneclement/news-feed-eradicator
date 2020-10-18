import injectUI, { isAlreadyInjected } from '../lib/inject-ui';
import { isEnabled } from '../lib/is-enabled';
import { remove } from '../lib/remove-news-feed';
import { Store } from '../store';

const elementsToRemove = ['#contents'];

const elementsToEmpty = ['#contents'];

export function checkSite(): boolean {
	return window.location.host.includes('youtube.com');
}

export function eradicate(store: Store) {
	function eradicateRetry() {
		const settings = store.getState().settings;
		if (settings == null || !isEnabled(settings)) {
			return;
		}

		// Don't do anything if the UI hasn't loaded yet
		const feed = document.querySelector('#contents');

		if (feed == null) {
			return;
		}

		const container = feed.parentNode;

		if (container == null) {
			return;
		}

		remove({ toEmpty: elementsToRemove });

		// Add News Feed Eradicator quote/info panel
		if (!isAlreadyInjected()) {
			injectUI(container, store);
		}
	}

	// This delay ensures that the elements have been created by Youtube's
	// scripts before we attempt to replace them
	setInterval(eradicateRetry, 1000);
}
