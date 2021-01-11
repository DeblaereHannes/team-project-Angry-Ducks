let chosenHeartRateService = null;
var HR, HR2;

const test = function() {
    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
        filters: [{
          services: ['heart_rate'],
        }]
      }).then(device => device.gatt.connect())                  //vanaf hier paar instellingen die ik niet versta
      .then(server => server.getPrimaryService('heart_rate'))
      .then(service => {
        chosenHeartRateService = service;
        return Promise.all([
          service.getCharacteristic('heart_rate_measurement')
            .then(handleHeartRateMeasurementCharacteristic),
        ]);
      });
  };

function handleHeartRateMeasurementCharacteristic(characteristic) {
  return characteristic.startNotifications()
  .then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged);
  });
}

function onHeartRateChanged(event) {
  const characteristic = event.target;
  //console.log(parseHeartRate(characteristic.value));
  HR = parseHeartRate(characteristic.value).heartRate;
  document.querySelector('.js-liveHR').innerHTML = `live heart rate: ${HR}`;
}

  const BT = function() {
    //opent de bluetooth interface van google waar je aparaten kan koppelen
    navigator.bluetooth.requestDevice({
        filters: [{
          services: ['heart_rate'],
        }]
      }).then(device => device.gatt.connect())                  //vanaf hier paar instellingen die ik niet versta
      .then(server => server.getPrimaryService('heart_rate'))
      .then(service => {
        chosenHeartRateService = service;
        return Promise.all([
          service.getCharacteristic('heart_rate_measurement')
            .then(handleHeartRateMeasurementCharacteristic2),
        ]);
      });
  };

function handleHeartRateMeasurementCharacteristic2(characteristic) {
  return characteristic.startNotifications()
  .then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onHeartRateChanged2);
  });
}

function onHeartRateChanged2(event) {
  const characteristic = event.target;
  //console.log(parseHeartRate(characteristic.value));
  HR2 = parseHeartRate(characteristic.value).heartRate;
  document.querySelector('.js-liveHR2').innerHTML = `live heart rate: ${HR2}`;
}

function parseHeartRate(data) {         //functie die de heartrate leesbaar maakt
    const flags = data.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result = {};
    let index = 1;
    if (rate16Bits) {
      result.heartRate = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heartRate = data.getUint8(index);
      index += 1;
    }
    const contactDetected = flags & 0x2;
    const contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      const rrIntervals = [];
      for (; index + 1 < data.byteLength; index += 2) {
        rrIntervals.push(data.getUint16(index, /*littleEndian=*/true));
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }

  const shoot = function() {
    //console.log(HR);
    document.querySelector('.js-shootwaarde').innerHTML = `shootwaarde: ${HR}`;
  }

  const shoot2 = function() {
    //console.log(HR);
    document.querySelector('.js-shootwaarde2').innerHTML = `shootwaarde: ${HR2}`;
  }