'use strict'
import { DOM } from './dom';

export class View {

    get buttonSelector(): string {
        return `.button__${this.name}`;
    }

    get selector(): string {
        return `.section--${this.name}`;
    }

    constructor(public name: string) {
        DOM.listenAll(this.buttonSelector, 'click', this.onButtonClicked.bind(this));
    }

    activate() {
        document.location.hash = this.name;
    }

    deactivate() {
        document.location.hash = '';
    }

    private onButtonClicked(e: MouseEvent) {
        if (document.body.classList.contains(`is-section--${this.name}`)) {
            this.deactivate();
        }
        else {
            this.activate();
        }
    }
}