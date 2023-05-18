class Header {
  constructor() {
    this.mobileButton = document.querySelector('[data-mobile-menu-button]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');

    this.addListeners();
  }

  addListeners() {
    console.log('addListeners');
    this.mobileButton.addEventListener('click', this.toggleMobileMenu.bind(this));
  }

  toggleMobileMenu() {
    console.log('toggleMobileMenu');
    this.mobileButton.classList.toggle('_opened');
    this.mobileMenu.classList.toggle('_opened')
  }
}

export default new Header();
