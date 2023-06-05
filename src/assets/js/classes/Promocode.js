const PROMOCODES_BY_PERCENT = {
	PROMO100: 100,
	PROMO200: 200,
	PROMO250: 250,
};

const INVALID_CLASS = '_incorrect';
const INVALID_ATTRIBUTE = 'data-error';
const INVALID_TEXT = 'Promocode is not working';

class Promocode {
	constructor() {
		// We assume that now there is one input field for the promocode
		// and one submit button on the project
		this.input = document.querySelector('[data-promocode-input]');
		this.inputLabel = document.querySelector('[data-promocode-label]');
		this.button = document.querySelector('[data-promocode-button]');

		if (!this.input || !this.button) {
			console.error(
				'Plese make sure that [data-promocode-input] and [data-promocode-button] are exist'
			);
		}

		this.promocode = '';
		this.init();
	}

	init() {
		this.input.addEventListener('input', this.changePromocode.bind(this));
		this.input.addEventListener('keyup', this.applyPromocode.bind(this));
		this.button.addEventListener('click', this.applyPromocode.bind(this));
	}

	changePromocode(event) {
		this.promocode = event.target.value.toUpperCase();
		event.target.value = this.promocode;
	}

	applyPromocode(event) {
		if (this.isNeedToApplyPromocode(event)) {
			const discount = PROMOCODES_BY_PERCENT[this.promocode];

			if (discount) {
				this.unsetError();
				const customEvent = new CustomEvent('applyPromocode', { detail: discount });
				document.dispatchEvent(customEvent);
				this.resetPromocodeInput();
			} else {
				this.setError();
			}
		}
	}

	isNeedToApplyPromocode(event) {
		return event.key === 'Enter' || event.keyCode === 13 || event.type === 'click';
	}

	unsetError() {
		this.input.classList.remove(INVALID_CLASS);
		this.inputLabel.classList.remove(INVALID_CLASS);
		this.inputLabel.removeAttribute(INVALID_ATTRIBUTE);
	}

	setError() {
		this.input.classList.add(INVALID_CLASS);
		this.inputLabel.classList.add(INVALID_CLASS);
		this.inputLabel.setAttribute(INVALID_ATTRIBUTE, INVALID_TEXT);
	}

	resetPromocodeInput() {
		this.promocode = '';
		this.input.value = '';
	}
}

export default new Promocode();
