'use strict';

const Homey = require('homey');


class MoehlenhoffApp extends Homey.App {

	onInit() {
		this.log('Möhlenhoff Application is running...');
	}

}

module.exports = MoehlenhoffApp;