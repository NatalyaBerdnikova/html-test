class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Cart: require('./classes/Cart').default,
			Promocode: require('./classes/Promocode').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {
			Header: require('../../includes/header/header'),
			PurchaseWizard: require('../../includes/purchase-wizard/purchase-wizard'),
			Steps: require('../../components/steps/steps'),
			Card: require('../../includes/card-form/card-form'),
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
