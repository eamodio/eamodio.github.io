'use strict';
/*global window document*/
import { DOM } from './dom';
import { MainView } from './mainView';
import { View } from './view';

export class App {
    activeView: string = '';

    readonly main: MainView;
    readonly views: View[];

    constructor() {
        this.main = new MainView();

        this.views = [];
        for (const el of document.querySelectorAll<HTMLInputElement>('.section[data-view]')) {
            const view = el.dataset.view;
            if (view === undefined) continue;

            this.views.push(new View(view));
        }

        // Setup easter egg
        const marvin = document.querySelector('.footer__marvin')!;
        marvin.addEventListener('click', this.onMarvinClicked.bind(this) as (this: Element, ev: Event) => any, false);

        DOM.listenAll('.section__back-button', 'click', this.onBackButtonClicked.bind(this));
        window.addEventListener('hashchange', this.onHashChanged.bind(this), false);

        this.switchView(document.location!.hash && document.location!.hash.substring(1), true);

        setTimeout(() => {
            document.body.classList.remove('preload');
        }, 750); // Wait for the length of the fade-out animation
    }

    switchView(view: string, loading: boolean = false) {
        const previous = this.activeView;

        const classList = document.body.classList;
        switch (view) {
            case '': {
                this.activeView = '';

                if (!loading) {
                    classList.remove(
                        ...[...classList].filter(c => {
                            return c.match(/^is-section\S*/);
                        })
                    );
                    document.location!.hash = '';
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
                if (!this.views.some(v => v.name === view)) {
                    this.switchView('', false);
                    return;
                }

                this.activeView = view;

                // Pause the typing animation if its running
                this.main.pause();

                const sectionClass = `is-section--${view}`;
                if (classList.contains(sectionClass)) {
                    classList.remove('is-section', sectionClass);
                    document.location!.hash = '';

                    return;
                }

                if (classList.contains('is-section')) {
                    classList.remove(
                        ...[...classList].filter(c => {
                            return c.match(/^is-section--\S+/);
                        })
                    );
                }

                classList.add('is-section', sectionClass);
                document.location!.hash = view;

                break;
            }
        }
    }

    private onBackButtonClicked(e: MouseEvent) {
        document.location!.hash = '';
    }

    private onHashChanged(e: HashChangeEvent) {
        this.switchView(document.location!.hash && document.location!.hash.substring(1));
    }

    private onMarvinClicked(e: MouseEvent) {
        const template = document.createElement('template');
        template.innerHTML =
            '<div class="marvin"><img class="marvin__takeover" src="assets/marvin-takeover.svg" alt="Marvin the Martian"/><audio id="kaboom" autoplay><source src="assets/kaboom.mp3"></audio></div>';
        const el = document.body.appendChild(template.content.firstChild!) as HTMLElement;

        const takeover = el.querySelector('.marvin__takeover')!;
        takeover.addEventListener('click', () => document.body.removeChild(el), false);
    }
}
