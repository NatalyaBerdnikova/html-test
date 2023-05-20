import Product from './Product';

const CONST_PRICES = {
	tax: 100,
	shipping: 150,
};

class Cart {
	constructor() {
		this.subTotalNode = document.querySelector('[data-subtotal]');
		this.totalNode = document.querySelector('[data-total]');
		this.productsCountNode = document.querySelector('[data-cart-product-count]');

		this.items = [];

		this.init();
	}

	init() {
		this.productNodes = document.querySelectorAll('[data-cart-product-id]');
		this.productNodes.forEach(productCard => {
			const product = new Product(productCard);
			this.items.push(product);
			productCard.addEventListener('increase', this.refresh.bind(this));
			productCard.addEventListener('decrease', this.refresh.bind(this));
			productCard.addEventListener('remove', this.removeItem.bind(this));
		});
		this.refresh();
	}

	removeItem(event) {
		const itemId = event.detail;
		this.items = this.items.filter(({ id }) => itemId !== id);
		this.refresh();
	}

	calculateSubTotal() {
		this.subTotal = this.items.reduce((acc, { count, price }) => acc + count * Number(price), 0);
	}

	calculateTotalSum() {
		this.totalSum =
			Object.values(CONST_PRICES).reduce((acc, price) => acc + price, 0) + this.subTotal;
	}

	calculateProductsCount() {
		this.productsCount = this.items.reduce((acc, { count }) => acc + count, 0);
	}

	refreshSubSum() {
		this.calculateSubTotal();
		this.subTotalNode.innerHTML = this.prettifySumString(this.subTotal);
	}

	refreshSum() {
		this.calculateTotalSum();
		this.totalNode.innerHTML = this.prettifySumString(this.totalSum);
	}

	refreshProductsCount() {
		this.calculateProductsCount();
		this.productsCountNode.innerHTML = this.productsCount;
	}

	refresh() {
		this.refreshProductsCount();
		this.refreshSubSum();
		this.refreshSum();
	}

	prettifySumString(number) {
		const preparedString = `$ ${number.toLocaleString('ru-RU')}`;
		return preparedString;
	}
}

export default new Cart();
