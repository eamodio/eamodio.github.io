'use strict';
/*global document*/

export namespace DOM {
	export function listen<K extends keyof WindowEventMap>(
		$el: Element,
		name: K,
		listener: (this: Element, ev: WindowEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	) {
		$el.addEventListener(name, listener as EventListener, options ?? false);
	}

	export function listenAll<K extends keyof WindowEventMap>(
		selector: string,
		name: K,
		listener: (this: Element, ev: WindowEventMap[K]) => any,
		el?: Element,
		options?: boolean | AddEventListenerOptions
	) {
		const $els = (el ?? document).querySelectorAll(selector);
		for (const $el of $els) {
			$el.addEventListener(name, listener as EventListener, options ?? false);
		}
	}

	export function $<T extends Element>(selector: string): NodeListOf<T> {
		return document.querySelectorAll<T>(selector);
	}
}

export namespace Storage {
	export function clear(): void {
		localStorage.clear();
	}

	export function get<T>(key: string): T | undefined {
		const value = localStorage.getItem(key);
		if (value == null) return undefined;

		return JSON.parse(value);
	}

	export function remove(key: string): void {
		localStorage.removeItem(key);
	}

	export function set<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
