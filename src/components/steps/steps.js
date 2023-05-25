const STEP_CLASSES = {
	active: 'steps__item _active',
	completed: 'steps__item _completed',
	disabled: 'steps__item _disabled',
};

class Steps {
	constructor() {
		this.container = document.querySelector('[data-steps]');

		if (!this.container) {
			console.error('Please make sure that [data-steps] element exist');
			return;
		}

		this.steps = this.container.querySelectorAll('[data-step]');
		this.progressBar = this.container.querySelector('[data-steps-progress]');
		this.currentStepIndex = 2;

		this.initializeButtons();
		this.changeStepClass();
		this.changeProgressBarStyles();
		this.container.addEventListener('change', event => this.changeCurrentStep(event.detail));
	}

	initializeButtons() {
		[...this.steps].forEach(step => {
			step.addEventListener('click', () => {
				this.changeCurrentStep(step.dataset.step);
				this.emitStepChange();
			});
		});
	}

	emitStepChange() {
		const event = new CustomEvent('stepChanged', { detail: this.currentStepIndex });
		this.container.dispatchEvent(event);
	}

	changeCurrentStep(newIndex) {
		this.currentStepIndex = newIndex;
		this.changeStepClass();
		this.changeProgressBarStyles();
	}

	changeStepClass() {
		clearTimeout(this.timeout);

		[...this.steps].forEach((step, index) => {
			if (index < this.currentStepIndex) {
				step.classList = STEP_CLASSES.completed;
				return;
			}
			if (index > this.currentStepIndex) {
				step.classList = STEP_CLASSES.disabled;
				return;
			}
			this.timeout = setTimeout(() => {
				step.classList = STEP_CLASSES.active;
			}, 150);
		});
	}

	changeProgressBarStyles() {
		this.progressBar.style.transform = `scaleX(${this.currentStepIndex / (this.steps.length - 1)})`;
	}
}

export default new Steps();
