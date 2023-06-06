const CARD_NUMBER_INPUT_COUNT = 4;

class CardForm {
	constructor() {
		this.container = document.querySelector('[data-card-form]');

		if (!this.container) {
			console.error('CardForm error. Please make sure that [data-card-form] element exist');
			return;
		}

		this.nameInput = this.container.querySelector('[data-card-name]');
		this.numberInputs = this.container.querySelectorAll('[data-card-number]');
		this.dateInput = this.container.querySelector('[data-card-date]');
		this.cvvInput = this.container.querySelector('[data-card-cvv]');

		this.name = '';
		this.number = '';
		this.date = '';
		this.cvv = '';

		this.addEventListeners();
	}

	addEventListeners() {
		this.nameInput.addEventListener('input', this.onInputName.bind(this));
		this.numberInputs.forEach(input => {
			input.addEventListener('input', this.onInputNumber.bind(this));
		});
		this.dateInput.addEventListener('input', this.onInputDate.bind(this));
		this.cvvInput.addEventListener('input', this.onInputCvv.bind(this));
	}

	onInputName(event) {
		this.name = event.target.value.toUpperCase();
		event.target.value = this.name;
	}

	onInputNumber(event) {
		const number = event.target.value;
		const inputIndex = event.target.dataset.cardNumber;

		if (number.length >= CARD_NUMBER_INPUT_COUNT) {
			if (this.numberInputs[Number(inputIndex) + 1]) {
				this.numberInputs[Number(inputIndex) + 1].focus();
			} else {
				this.dateInput.focus();
			}
		}
	}

	onInputDate(event) {
		const date = Array.from(event.target.value)
			.filter(el => el !== '/')
			.join('');
		this.date = date;

		if (this.date.length > 2) {
			event.target.value = this.date.slice(0, 2) + '/' + this.date.slice(2, 4);
		} else {
			event.target.value = this.date.slice(0, 2);
		}

		if (this.date.length >= 4) {
			this.cvvInput.focus();
		}
	}

	onInputCvv(event) {
		if (event.target.value > 999) {
			event.target.value = this.cvv;
			return;
		}

		this.cvv = event.target.value;
		event.target.value = this.cvv;
	}
}

export default new CardForm();
