const PROMOCODES = {
	PROMO100: 100,
	PROMO200: 200,
	PROMO250: 250,
};

const INVALID_CLASS = '_incorrect';
const INVALID_ATTRIBUTE = 'data-error';
const INVALID_TEXT = 'Promocode is not working';

/**
 * Class for the promocode module
 * - Validate promocode
 * - Emit applying promocode to cart module
 */
class Promocode {
	constructor() {
		this.container = document.querySelector('[data-promocode-container]');

		if (!this.container) {
			console.error('Please make sure that [data-promocode-container] element exist');
		}
		this.input = this.container.querySelector('[data-promocode-input]');
		this.inputLabel = this.container.querySelector('[data-promocode-label]');
		this.button = this.container.querySelector('[data-promocode-button]');

		if (!this.input || !this.button) {
			console.error(
				'Please make sure that [data-promocode-input] and [data-promocode-button] are exist'
			);
		}

		this.value = '';
		this.addEventListeners();
	}

	addEventListeners() {
		this.input.addEventListener('input', this.change.bind(this));
		this.input.addEventListener('keyup', this.apply.bind(this));
		this.button.addEventListener('click', this.apply.bind(this));
	}

	change(event) {
		this.value = event.target.value.toUpperCase();
		event.target.value = this.value;
	}

	apply(event) {
		if (!this.isNeedToApply(event)) {
			return;
		}

		const discount = PROMOCODES[this.value];
		if (!discount) {
			this.setError();
		}

		this.unsetError();
		const customEvent = new CustomEvent('applyPromocode', { detail: discount });
		document.dispatchEvent(customEvent);
		this.resetInput();
	}

	isNeedToApply(event) {
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

	resetInput() {
		this.value = '';
		this.input.value = '';
	}
}

export default new Promocode();
