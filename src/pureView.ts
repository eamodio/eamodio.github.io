'use strict';
/*global document*/
import { DOM, Storage } from './dom';
import { View } from './view';

interface Donation {
	timestamp: number;
	tier: DonationTier | undefined;
	version: number;
}

enum DonationTier {
	OneDollar = 1,
	TwoDollars = 2,
	ThreePlusDollars = 3
}

const DonationKey = 'pure-donation';

export class PureView extends View {
	private readonly $donatePopup: HTMLElement;
	private _tier: DonationTier | undefined;

	constructor(public name: string) {
		super(name);

		DOM.listen(document.body, 'click', this.onBodyClicked.bind(this));
		DOM.listenAll('[data-action="pure-donate-button"]', 'click', this.onDonateButtonClicked.bind(this));
		DOM.listenAll('[data-action="pure-tier"]', 'click', this.onTierClicked.bind(this));
		DOM.listenAll('[data-action="watch-toggle"]', 'click', this.onWatchClicked.bind(this));

		this.$donatePopup = DOM.$<HTMLElement>('[data-target="pure-donate-popup"]')[0]!;

		this.update();
	}

	activate(paths?: string[]) {
		super.activate(paths);

		DOM.$('[data-action="watch-toggle"]')[0]?.classList.remove('expand');

		const [route, ...data] = paths ?? [];
		switch (route) {
			case 'donate': {
				const [tier] = data;

				let $el;
				[$el] = DOM.$('[data-target="donate-scroll-to"]');
				$el?.scrollIntoView({ behavior: 'smooth', block: 'start' });

				if (!tier) {
					this.setActiveTier(undefined);

					return;
				}

				const [$tier] = DOM.$<HTMLElement>(`[data-tier="${tier}"]`);

				const tierName = $tier.dataset.tierName;
				const amount = $tier.dataset.tierAmount;

				[$el] = DOM.$<HTMLAnchorElement>('[data-target="pure-donate-button"]');
				$el.href = `https://www.paypal.com/paypalme2/eamodio${amount == null ? '' : `/${amount}USD`}`;
				$el.innerHTML = `Donate ${tierName ? `${tierName} ` : ''}<span class="via">via</span> PayPal`;

				this.setActiveTier($tier?.classList.contains('active') ? undefined : Number(tier), $tier);

				break;
			}

			default: {
				this.setActiveTier(undefined);
			}
		}
	}

	private onBodyClicked(e: MouseEvent) {
		DOM.$('[data-action="watch-toggle"]')[0]?.classList.remove('expand');
	}

	private onDonateButtonClicked(e: MouseEvent) {
		e.stopPropagation();

		setTimeout(() => this.setDonation(), 500);
	}

	private onTierClicked(e: MouseEvent) {
		e.stopPropagation();

		const tier = (e.currentTarget as HTMLElement)?.dataset.tier;
		const path = `/donate${tier ? `/${tier}` : ''}`;
		this.setPath(this.matchesPath(path) ? '/donate' : path);
	}

	private onWatchClicked(e: MouseEvent) {
		e.stopPropagation();

		(e.currentTarget as HTMLElement)?.classList.toggle('expand');
	}

	private setActiveTier(tier: DonationTier | undefined, $active?: HTMLElement) {
		this._tier = tier;

		const $els = DOM.$('[data-action="pure-tier"]');
		for (const $el of $els) {
			$el.classList.remove('active');
		}

		if (tier == null) {
			this.$donatePopup.classList.add('hide');
		} else {
			$active?.classList.add('active');
			this.$donatePopup.classList.remove('hide');
		}
	}

	private setDonation() {
		const date = new Date();
		const donation: Donation = {
			timestamp: date.getTime(),
			tier: this._tier,
			version: 1
		};

		Storage.set(DonationKey, donation);
		this.update();
	}

	private update() {
		const donation = Storage.get<Donation>(DonationKey);
		if (donation === undefined) return;

		let $el;
		$el = DOM.$<HTMLAnchorElement>('[data-target="pure-donated-on"]')[0]!;

		if ($el == null) {
			const template = document.createElement('template');
			template.innerHTML = `<p class="donated" data-target="pure-donated-on">
	You donated on ${new Date(donation.timestamp).toLocaleDateString()}. Thank you!
</p>`;

			this.$donatePopup.prepend(template.content.firstChild!);
		}

		const date = new Date();
		const code = `${date
			.getUTCFullYear()
			.toString()
			.substr(2)}${date.getUTCMonth().toString(16)}`;

		$el = DOM.$<HTMLAnchorElement>('[data-target="pure-donate-code"]')[0]!;
		$el.textContent = code;
		$el.classList.add('donate-code--donated');
	}
}
