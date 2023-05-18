class Header {
	constructor() {
		this.mobileButton = document.querySelector('[data-mobile-menu-button]');
		this.mobileMenu = document.querySelector('[data-mobile-menu]');

		this.addListeners();
	}

	addListeners() {
		this.mobileButton.addEventListener('click', this.toggleMobileMenu.bind(this));

		this.toggleMobileMenuByDevice();
		window.addEventListener('resize', this.toggleMobileMenuByDevice.bind(this));
	}

	toggleMobileMenuByDevice() {
		const isMobile = document.body.clientWidth < 1024;

		if (isMobile) {
			this.mobileButton.classList.remove('_opened');
			this.mobileMenu.classList.remove('_opened');
		} else {
			this.mobileMenu.classList.add('_opened');
		}
	}

	toggleMobileMenu() {
		this.mobileButton.classList.toggle('_opened');
		this.mobileMenu.classList.toggle('_opened');
	}
}

export default new Header();
