import utils from '../../assets/js/utils/utils';

const OPEN_CLASS = '_opened';

/**
 * Class for control mobile menu
 */
class Header {
	constructor() {
		this.mobileButton = document.querySelector('[data-mobile-menu-button]');
		this.mobileMenu = document.querySelector('[data-mobile-menu]');

		this.addEventListeners();
	}

	addEventListeners() {
		this.mobileButton.addEventListener('click', this.toggleMobileMenu.bind(this));

		this.toggleMobileMenuByDevice();
		window.addEventListener('resize', utils.throttle(this.toggleMobileMenuByDevice.bind(this)));
	}

	toggleMobileMenuByDevice() {
		const isMobile = document.body.clientWidth < 1024;

		if (isMobile) {
			this.mobileButton.classList.remove(OPEN_CLASS);
			this.mobileMenu.classList.remove(OPEN_CLASS);
		} else {
			this.mobileMenu.classList.add(OPEN_CLASS);
		}
	}

	toggleMobileMenu() {
		this.mobileButton.classList.toggle(OPEN_CLASS);
		this.mobileMenu.classList.toggle(OPEN_CLASS);
	}
}

export default new Header();
