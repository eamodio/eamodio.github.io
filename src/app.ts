'use strict';
/*global window document*/
import { DOM } from './dom';
import { MainView } from './mainView';
import { View } from './view';
import { PureView } from './pureView';

export class App {
	activeView = '';

	readonly main: MainView;
	readonly views: View[];

	constructor() {
		this.main = new MainView();

		this.views = [];
		for (const $el of DOM.$<HTMLInputElement>('.section[data-view]')) {
			const view = $el.dataset.view;
			if (view == null) continue;

			const viewCtor = view === 'pure' ? PureView : View;
			this.views.push(new viewCtor(view));
		}

		// Setup easter egg
		DOM.on('[data-action="marvin"]', 'click', this.onMarvinClicked.bind(this));

		DOM.on('[data-action="back"]', 'click', this.onBackButtonClicked.bind(this));
		window.addEventListener('hashchange', this.onHashChanged.bind(this), false);

		const [hash, paths] = this.getHashAndPaths();
		this.switchView(hash, paths, true);

		setTimeout(() => {
			document.body.classList.remove('preload');
		}, 750); // Wait for the length of the fade-out animation
	}

	switchView(hash: string, paths: string[], loading = false) {
		const previous = this.activeView;

		switch (hash) {
			case '': {
				this.activeView = '';

				if (previous !== this.activeView) {
					const prev = this.views.find(v => v.name === previous);
					if (prev != null) {
						prev.deactivate();
					}
				}

				if (!loading) {
					document.location.hash = '';
				}

				// If the typing has completed, kick out
				if (this.main.typingCompleted) break;

				// If the typing is paused, resume it
				if (this.main.resume()) break;

				// If the typing hasn't started, start it
				this.main.activate(previous);

				break;
			}
			default: {
				const view = this.views.find(v => v.name === hash);
				if (view == null) {
					this.switchView('', [], false);
					return;
				}

				this.activeView = hash;

				if (previous !== this.activeView) {
					const prev = this.views.find(v => v.name === previous);
					if (prev != null) {
						prev.deactivate();
					}
				}

				// Pause the typing animation if its running
				this.main.pause();

				view.activate(paths, loading);

				break;
			}
		}
	}

	private onBackButtonClicked(e: MouseEvent) {
		document.location.hash = '';
	}

	private onHashChanged(e: HashChangeEvent) {
		const [hash, paths] = this.getHashAndPaths();

		if (this.redirect(hash, paths)) return;

		this.switchView(hash, paths);
	}

	private getHashAndPaths(): [string, string[]] {
		let hash = document.location.hash?.substring(1);
		let paths: string[] = [];
		if (hash) {
			[hash, ...paths] = hash.split('/');
		}

		return [hash, paths];
	}

	private redirect(hash: string, paths: string[]): boolean {
		return false;
	}

	private onMarvinClicked(e: MouseEvent) {
		const template = document.createElement('template');
		template.innerHTML = `<div class="marvin">
	<audio id="kaboom" autoplay><source src="assets/kaboom.mp3"></audio>
</div>`;

		const $el = document.body.appendChild(template.content.firstChild!) as HTMLElement;
		$el.addEventListener('click', () => document.body.removeChild($el), false);
	}
}
