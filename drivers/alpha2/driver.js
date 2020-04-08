'use strict';

const Homey = require('homey');
const Alpha2 = require('./../../lib/alpha');

class Alpha2Driver extends Homey.Driver {

	onInit() {
		this.log('Alpha 2 driver has been initiated');

	}
    onPairListDevices( data, callback ) {
        const ipAddress = Homey.ManagerSettings.get('ipAddress');

        if (!ipAddress) {
            callback(new Error(Homey.__('pair.ipNotConfigured')));
        } else {
            this.log(`Getting rooms from IP: ${ipAddress}`);
            let alpha = new Alpha2(ipAddress);
            alpha.onPairingList(callback);
      }
  }
}

module.exports = Alpha2Driver;