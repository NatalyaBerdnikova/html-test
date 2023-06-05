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

		this.init();
	}

	init() {
		this.nameInput.addEventListener('input', this.inputName.bind(this));
		this.numberInputs.forEach(input => {
			input.addEventListener('input', this.inputNumber.bind(this));
		});
		this.dateInput.addEventListener('input', this.inputDate.bind(this));
		this.cvvInput.addEventListener('input', this.inputCvv.bind(this));
	}

	inputName(event) {
		this.name = event.target.value.toUpperCase();
		event.target.value = this.name;
	}

	inputNumber(event) {
		const number = event.target.value;
		const inputIndex = event.target.dataset.cardNumber;

		if (number.length >= 4) {
			if (this.numberInputs[Number(inputIndex) + 1]) {
				this.numberInputs[Number(inputIndex) + 1].focus();
			} else {
				this.dateInput.focus();
			}
		}
	}

	inputDate(event) {
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

	inputCvv(event) {
		this.cvv = event.target.value;
	}
}

export default new CardForm();
