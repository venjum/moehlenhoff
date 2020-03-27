const fetch = require('node-fetch');
const xml2js = require("xml2js");

function getStatus(address, port) {
  return new Promise(function (resolve, reject) {
    fetch(`http://${address}:${port}/data/cyclic.xml?`, {
        method: 'GET',
        timeout: 4000
      })
      .then(checkStatus)
      .then(res => res.text())
      .then(body => {
        console.log(body)
        var parser = new xml2js.Parser();
        parser.parseStringPromise(body)
        .then(function (result) {
          console.dir(result)
          console.log(result.Devices.Device);
          console.log('Done');
          return result;
        })
        .catch(function (err) {
          console.log('Failed')
          return reject(err)
        });
      })
      .catch(err => {
        return reject(err);
      });
  })
}

// var parser = new xml2js.Parser(/* options */);
// parser.parseStringPromise(data).then(function (result) {
//   console.dir(result);
//   console.log('Done');
// })
// .catch(function (err) {
//   // Failed
// });

function getStatus2(address, port) {
  return new Promise(function (resolve, reject) {
    fetch(`http://${address}:${port}/data/cyclic.xml?`, {
        method: 'GET',
        timeout: 4000
      })
      .then(checkStatus)
      .then(res => res.text())
      .then(body => console.log(body));
  })
}

function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw new Error(res.status);
  }
}

getStatus('192.168.1.103', '80')
