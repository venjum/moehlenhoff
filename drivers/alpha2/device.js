'use strict';

const Homey = require('homey');

class Alpha2Device extends Homey.Device {

	onInit() {
		this.log('Device has been initiated');
        this.log('Name:', this.getName());
        this.log('Class:', this.getClass());

        // Register capability listeners
        this.registerCapabilityListener('target_temperature', this.onCapabilityTargetTemperature.bind(this));
	}

    async onCapabilityTargetTemperature( value, opts ) {

        this.log(`Set target temp to: ${value}`);
        // ... set value to real device, e.g.
        // await setMyDeviceState({ on: value });

        // or, throw an error
        // throw new Error('Switching the device failed!');
    }

}

module.exports = Alpha2Device;