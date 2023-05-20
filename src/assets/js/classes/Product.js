class Product {
	constructor(node) {
		if (!node) {
			console.error(
				'Props for the Product class were not provided, please check the use of Product class'
			);
			return;
		}

		this.node = node;
		this.count = 1;
		this.init();
	}

	init() {
		this.id = this.node.dataset.cartProductId;
		this.price = this.node.dataset.price;

		this.increaseButton = this.node.querySelector('[data-counter-increase]');
		this.decreaseButton = this.node.querySelector('[data-counter-decrease]');
		this.deleteButton = this.node.querySelector('[data-delete-button]');

		this.countNode = this.node.querySelector('[data-counter-count]');
		this.increaseEvent = new CustomEvent('increase', { detail: this.id });
		this.decreaseEvent = new CustomEvent('decrease', { detail: this.id });
		this.removeEvent = new CustomEvent('remove', { detail: this.id });
		this.addEvents(this);
	}

	addEvents() {
		this.increaseButton.addEventListener('click', this.increase.bind(this));
		this.decreaseButton.addEventListener('click', this.decrease.bind(this));
		this.deleteButton.addEventListener('click', this.remove.bind(this));
	}

	increase() {
		this.count += 1;
		this.countNode.innerText = this.count;
		this.node.dispatchEvent(this.increaseEvent);
	}

	decrease() {
		this.count -= 1;
		if (this.count <= 0) {
			this.remove(this);
		}
		this.countNode.innerText = this.count;
		this.node.dispatchEvent(this.decreaseEvent);
	}

	remove() {
		this.destroy();
		this.node.dispatchEvent(this.removeEvent);
		this.node.remove();
	}

	destroy() {
		this.increaseButton.removeEventListener('click', this.increase.bind(this));
		this.decreaseButton.removeEventListener('click', this.decrease.bind(this));
		this.deleteButton.removeEventListener('click', this.remove.bind(this));
	}
}

export default Product;
