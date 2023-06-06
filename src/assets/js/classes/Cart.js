import Product from './Product';
import utils from '../utils/utils';

const CONST_PRICES = {
	tax: 100,
	shipping: 150,
};

const PROMOCODE_TEXT = 'Promo code';
const CART_LIST_ITEM_CLASS = {
	name: 'section-cart-total__name',
	value: 'section-cart-total__value',
};

/**
 * Class for the cart module
 * - Calculate and display totals
 * - Render promocode if it`s applied
 */
class Cart {
	constructor() {
		this.container = document.querySelector('[data-cart-total]');
		if (!this.container) {
			console.error('Please make sure that [data-cart-total] element exist');
		}

		this.subTotalNode = this.container.querySelector('[data-subtotal]');
		this.totalNode = this.container.querySelector('[data-total]');
		this.productsCountNode = document.querySelector('[data-cart-product-count]');

		this.products = [];
		this.promocodeValue = 0;

		this.addEventListeners();
		this.refresh();
	}

	addEventListeners() {
		document.addEventListener('applyPromocode', this.applyPromocode.bind(this));

		this.productNodes = document.querySelectorAll('[data-cart-product-id]');
		this.productNodes.forEach(productCard => {
			const product = new Product(productCard);
			this.products.push(product);
			productCard.addEventListener('increase', this.refresh.bind(this));
			productCard.addEventListener('decrease', this.refresh.bind(this));
			productCard.addEventListener('remove', this.removeItem.bind(this));
		});
	}

	removeItem(event) {
		const itemId = event.detail;
		this.products = this.products.filter(({ id }) => itemId !== id);
		this.refresh();
	}

	applyPromocode(event) {
		this.promocodeValue = event.detail;

		this.renderPromocode();
		this.refreshSum();
	}

	renderPromocode() {
		const textTotalNode = this.totalNode.previousElementSibling;
		const promocodeNode = this.container.querySelector('[data-promocode-in-cart]');

		if (promocodeNode) {
			promocodeNode.innerText = this.prettifySumString(this.promocodeValue);
			return;
		}

		const promocodeTitleNode = document.createElement('span');
		promocodeTitleNode.classList = CART_LIST_ITEM_CLASS.name;
		promocodeTitleNode.innerText = PROMOCODE_TEXT;
		this.totalNode.parentNode.insertBefore(promocodeTitleNode, textTotalNode);

		const promocodeSumNode = document.createElement('span');
		promocodeSumNode.classList = CART_LIST_ITEM_CLASS.value;
		promocodeSumNode.innerText = this.prettifySumString(this.promocodeValue);
		promocodeSumNode.setAttribute('data-promocode-in-cart', this.promocodeValue);
		this.totalNode.parentNode.insertBefore(promocodeSumNode, textTotalNode);
	}

	calculateSubTotal() {
		return this.products.reduce((acc, { count, price }) => acc + count * Number(price), 0);
	}

	calculateTotalSum() {
		const subTotal = this.calculateSubTotal();

		return (
			Object.values(CONST_PRICES).reduce((acc, price) => acc + price, 0) +
			subTotal -
			this.promocodeValue
		);
	}

	calculateProductsCount() {
		return this.products.reduce((acc, { count }) => acc + count, 0);
	}

	refreshSubSum() {
		this.subTotalNode.innerHTML = this.prettifySumString(this.calculateSubTotal());
	}

	refreshSum() {
		this.totalNode.innerHTML = this.prettifySumString(this.calculateTotalSum());
	}

	refreshProductsCount() {
		if (!this.productsCountNode) {
			console.error('Please make sure that [data-cart-product-count] element exist');
			return;
		}
		this.productsCountNode.innerHTML = this.calculateProductsCount();
	}

	refresh() {
		this.refreshProductsCount();
		this.refreshSubSum();
		this.refreshSum();
	}

	prettifySumString(number) {
		return `$${utils.formatNumber(number)}`;
	}
}

export default new Cart();
