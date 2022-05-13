'use strict';

const Homey = require('homey');
const Alpha2 = require('./../../lib/alpha');
const defaultPollingInt = 300;

class Alpha2Driver extends Homey.Driver {

	onInit() {
		this.log('Alpha 2 driver has been initiated');
        this.alpha = null;
        this.ipAddress = Homey.ManagerSettings.get('ipAddress');
        this.refreshTimeout = null;

        if (this.ipAddress) {
            this.alpha = new Alpha2(this.ipAddress);
            this.getUpdatedState();
        }

	}
    onPairListDevices( data, callback ) {

        if (!this.alpha) {
            this.ipAddress = Homey.ManagerSettings.get('ipAddress');

            if (!this.ipAddress) {
                callback(new Error(Homey.__('pair.ipNotConfigured')));
            } else {
                this.log(`Getting rooms from IP: ${this.ipAddress}`);
                this.alpha = new Alpha2(this.ipAddress);
                if (this.refreshTimeout === null) {
                    this.getUpdatedState();
                }
            }
        }
        this.alpha.onPairingList(callback);
    }

    async getUpdatedState() {
        this.alphaData = await this.alpha.getStatus();
        this.getDevices().forEach(device => {
          var deviceId = device.getData().id;
          var deviceData = this.alphaData[deviceId];
          console.log(deviceData)
          device.update(deviceData);
        });
        const pollingInt = Homey.ManagerSettings.get('pollingInt') || defaultPollingInt;
        this.refreshTimeout = setTimeout(this.getUpdatedState.bind(this), pollingInt * 1000);
    }
}

module.exports = Alpha2Driver;