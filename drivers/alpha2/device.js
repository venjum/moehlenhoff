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

    onAdded() {
        this.log('Device added');
        // Get data from driver getDriver()
    }

    async update(room) {
        let jobs = [
            this.setCapabilityValue('target_temperature', room.targetTemp),
            this.setCapabilityValue('measure_temperature', room.measureTemp)
        ];
        await Promise.all(jobs).catch((err) => {
            this.log('Updating values failed:' + err);
        });
    }

}

module.exports = Alpha2Device;