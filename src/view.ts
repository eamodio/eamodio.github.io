'use strict';
/*global document*/
import { DOM } from './dom';

export class View {
	constructor(public name: string) {
		DOM.on(`[data-action="${this.name}"]`, 'click', this.onButtonClicked.bind(this));
	}

	get hash(): string {
		return `#${this.name}`;
	}

	activate(paths?: string[], loading: boolean = false) {
		// console.log(`View(${this.name}).activate`);
	}

	deactivate() {
		// console.log(`View(${this.name}).deactivate`);
	}

	protected getHash(path?: string): string {
		return `${this.hash}${!path ? '' : `${path.startsWith('/') ? path : `/${path}`}`}`.toLowerCase();
	}

	protected matchesPath(path?: string): boolean {
		return document.location.hash?.toLowerCase() === this.getHash(path);
	}

	protected setPath(path?: string) {
		document.location.hash = this.getHash(path);
	}

	private onButtonClicked(e: MouseEvent) {
		if (document.location.hash?.startsWith(this.hash)) {
			document.location.hash = '';
		} else {
			this.setPath();
		}
	}
}
