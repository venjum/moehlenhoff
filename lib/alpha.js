const fetch = require('node-fetch');
const xml2js = require("xml2js");
const util = require("util");

class Alpha2 {

  constructor(address, port=80) {
    this.address = address;
    this.port = port;
  }

  getStatus() {
    var url = `http://${this.address}:${this.port}/data/cyclic.xml?`;
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'GET',
          timeout: 4000
        })
        .then(checkStatus)
        .then(res => res.text())
        .then(body => {
          xml2js.parseStringPromise(body)
          .then(result => {
            var data = {};
            result.Devices.Device[0].HEATAREA.forEach(room => {
              data[room.$.nr] = {
                  'measureTemp': Number(room.T_ACTUAL[0]),
                  'targetTemp': Number(room.T_TARGET[0])
              }
            });
            resolve(data);
          })
          .catch(err => {
            console.log('Failed')
            return reject(err)
          });
        })
        .catch(err => {
          return reject(err);
        });
    })
  }

  getStatusStatic() {
    const url = `http://${this.address}:${this.port}/data/static.xml?`;
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'GET',
          timeout: 4000
        })
        .then(checkStatus)
        .then(res => res.text())
        .then(body => {
          xml2js.parseStringPromise(body)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            console.log('Failed')
            return reject(err)
          });
        })
        .catch(err => {
          return reject(err);
        });
    })
  }

  onPairingList(callback) {
    this.getStatusStatic().then(result => {
      var pairList =  result.Devices.Device[0].HEATAREA.map(room => (
        {
          name: room.HEATAREA_NAME[0],
          data: {id: room.$.nr}
        }));
      callback(null, pairList)
    })
  }
}


function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw new Error(res.status);
  }
}

module.exports = Alpha2;

//alpha2 = new Alpha2('192.168.1.103');
//alpha2.getStatus().then(data => {console.log(data)})

