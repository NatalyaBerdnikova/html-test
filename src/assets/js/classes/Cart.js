import Product from './Product';

const CONST_PRICES = {
	tax: 100,
	shipping: 150,
};

const PROMOCODE_TEXT = 'Promo code';
const CART_LIST_ITEM_CLASS = {
	name: 'section-cart-total__name',
	value: 'section-cart-total__value',
};

class Cart {
	constructor() {
		this.container = document.querySelector('[data-cart-total]');
		this.subTotalNode = this.container.querySelector('[data-subtotal]');
		this.totalNode = this.container.querySelector('[data-total]');
		this.productsCountNode = document.querySelector('[data-cart-product-count]');

		this.products = [];
		this.promocode = 0;

		this.init();
	}

	init() {
		document.addEventListener('applyPromocode', this.applyPromocode.bind(this));
		this.productNodes = document.querySelectorAll('[data-cart-product-id]');
		this.productNodes.forEach(productCard => {
			const product = new Product(productCard);
			this.products.push(product);
			productCard.addEventListener('increase', this.refresh.bind(this));
			productCard.addEventListener('decrease', this.refresh.bind(this));
			productCard.addEventListener('remove', this.removeItem.bind(this));
		});
		this.refresh();
	}

	removeItem(event) {
		const itemId = event.detail;
		this.products = this.products.filter(({ id }) => itemId !== id);
		this.refresh();
	}

	applyPromocode(event) {
		const discount = event.detail;
		const textTotalNode = this.totalNode.previousElementSibling;
		const promocodeNode = this.container.querySelector('[data-promocode-in-cart]');

		this.promocode = discount;

		if (promocodeNode) {
			this.changeExistingPromocode(promocodeNode);
		} else {
			const promocodeTitle = document.createElement('span');
			promocodeTitle.classList = CART_LIST_ITEM_CLASS.name;
			promocodeTitle.innerText = PROMOCODE_TEXT;
			this.totalNode.parentNode.insertBefore(promocodeTitle, textTotalNode);

			const promocodeSum = document.createElement('span');
			promocodeSum.classList = CART_LIST_ITEM_CLASS.value;
			promocodeSum.innerText = this.prettifySumString(discount);
			promocodeSum.setAttribute('data-promocode-in-cart', discount);
			this.totalNode.parentNode.insertBefore(promocodeSum, textTotalNode);
		}

		this.refreshSum();
	}

	changeExistingPromocode(node) {
		node.innerText = this.prettifySumString(this.promocode);
	}

	calculateSubTotal() {
		this.subTotal = this.products.reduce((acc, { count, price }) => acc + count * Number(price), 0);
	}

	calculateTotalSum() {
		this.totalSum =
			Object.values(CONST_PRICES).reduce((acc, price) => acc + price, 0) +
			this.subTotal -
			this.promocode;
	}

	calculateProductsCount() {
		this.productsCount = this.products.reduce((acc, { count }) => acc + count, 0);
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
		const preparedString = `$${number.toLocaleString('ru-RU')}`;
		return preparedString;
	}
}

export default new Cart();
