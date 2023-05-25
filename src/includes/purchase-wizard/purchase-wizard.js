const CLASS_HIDDEN = '_hidden';

class PurchaseWizard {
	constructor() {
		this.container = document.querySelector('[data-purchase-wizard]');

		if (!this.container) {
			console.error('Please make sure element [data-purchase-wizard] exist');
			return;
		}

		this.stepsContainer = document.querySelector('[data-steps]');
		this.wizardSteps = this.container.children;

		this.currentStepIndex = 2;
		this.init.call(this);
	}

	init() {
		[...this.wizardSteps].forEach(step => {
			const backButton = step.querySelector('[data-step-back-button]');
			backButton &&
				backButton.addEventListener('click', () => {
					this.changeCurrentWizardStep(this.currentStepIndex - 1);
					this.emitStepChanged();
				});
			const forwardButton = step.querySelector('[data-step-forward-button]');
			forwardButton &&
				forwardButton.addEventListener('click', () => {
					this.changeCurrentWizardStep(this.currentStepIndex + 1);
					this.emitStepChanged();
				});
		});

		this.stepsContainer.addEventListener('stepChanged', event =>
			this.changeCurrentWizardStep(event.detail)
		);
	}

	changeCurrentWizardStep(newIndex) {
		this.wizardSteps[this.currentStepIndex].classList.add(CLASS_HIDDEN);
		this.currentStepIndex = Number(newIndex);
		this.wizardSteps[this.currentStepIndex].classList.remove(CLASS_HIDDEN);
	}

	emitStepChanged() {
		const event = new CustomEvent('change', { detail: this.currentStepIndex });
		this.stepsContainer.dispatchEvent(event);
	}
}

export default new PurchaseWizard();
