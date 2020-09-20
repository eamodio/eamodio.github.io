'use strict';
/*global document*/
import Typed, { TypedOptions } from 'typed.js';

export class MainView {
	typingCompleted = false;

	private typingSubhead: Typed | undefined;
	private typingDesc: Typed | undefined;

	activate(previous?: string): void {
		if (previous) {
			setTimeout(() => this.startSubheadTyping(), 1000);
		} else {
			this.startSubheadTyping();
		}
	}

	pause(): boolean {
		if (this.typingSubhead !== undefined || this.typingDesc !== undefined) {
			this.typingSubhead && this.typingSubhead.stop();
			this.typingDesc && this.typingDesc.stop();

			return true;
		}

		return false;
	}

	resume(): boolean {
		if (this.typingSubhead !== undefined || this.typingDesc !== undefined) {
			setTimeout(() => {
				this.typingSubhead && this.typingSubhead.start();
				this.typingDesc && this.typingDesc.start();
			}, 1000);

			return true;
		}

		return false;
	}

	private onSubheadTypingCompleted(strings: string[]) {
		setTimeout(() => {
			this.typingSubhead!.destroy();
			this.typingSubhead = undefined;
			document.getElementById('subhead')!.innerText = strings[strings.length - 1];

			this.startDescTyping();
		}, 750);
	}

	private onDescTypingCompleted(strings: string[]) {
		this.typingCompleted = true;

		const els = document.querySelectorAll('[data-target="hero-button"]')!;
		for (const el of els) {
			el.classList.remove('hidden');
		}

		setTimeout(() => {
			this.typingDesc!.destroy();
			this.typingDesc = undefined;
			document.getElementById('desc')!.innerHTML = strings[strings.length - 1];
		}, 1000);
	}

	private startSubheadTyping() {
		const strings = ['entrepreneur', 'leader', 'innovator', 'architect', 'developer.'];
		const opts: TypedOptions = {
			strings: strings,
			autoInsertCss: false,
			backDelay: 1500,
			backSpeed: 30,
			typeSpeed: 90,
			onComplete: () => this.onSubheadTypingCompleted(strings)
		};
		this.typingSubhead = new Typed('#subhead', opts);
	}

	private startDescTyping() {
		const strings = ['full-stack<br /><span class="heart">&#10084;</span> open-source'];
		const opts: TypedOptions = {
			strings: strings,
			autoInsertCss: false,
			backDelay: 1500,
			backSpeed: 30,
			typeSpeed: 90,
			onComplete: () => this.onDescTypingCompleted(strings)
		};
		this.typingDesc = new Typed('#desc', opts);
	}
}
