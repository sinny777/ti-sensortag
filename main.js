
var SensorTag = require('./index');					// sensortag library
var tags = new Array;
var EXIT_GRACE_PERIOD = 2000; // milliseconds
var inRange = [];						        // list of tags connected

// ------------------------ sensorTag functions
function deviceConnected(device) {
	console.log('New SensorTag Device connected');
	SensorTag.stopDiscoverAll(deviceConnected);
	var deviceRecord = {};		// make an object to hold sensor values
	tags.push(deviceRecord);	// add it to the tags array

	// var id = device.id;
  	// var entered = !inRange[id];

	// if (entered) {
	// 	inRange[id] = {
	// 		peripheral: device
	// 	};

	// 	// console.log('"' + device.advertisement.localName + '" entered (RSSI ' + device.rssi + ') ' + new Date());
	// }

	// inRange[id].lastSeen = Date.now();	
	
	function disconnect() {
		console.log('tag disconnected!');
		process.exit(0);
	}

    function readBasicDetails(){
        device.readSystemId(function(error, systemId){
            console.log('systemId: >> ', systemId);
        });
        device.readSerialNumber(function(error, serialNumber){
            console.log('serialNumber: >> ', serialNumber);
        });
    }
	/*
	This function enables and configures the sensors, and
	sets up their notification listeners. Although it only shows
	simple key data here, you could duplicate this pattern
	with any of the sensors.
	*/
	function enableSensors() {		// attempt to enable the sensors
		console.log('Enabling sensors');
        readBasicDetails();
		// // enable sensor:
		// device.enableAccelerometer();
		// device.enableBarometricPressure();
		// // device.enableGyroscope();
        // device.enableMagnetometer();
		// device.enableHumidity();
		// device.enableIrTemperature();		
        // device.enableLuxometer();
		// // device.enableBatterLevel();

		// // make an object to hold each sensor's values:
		// deviceRecord.accel = {sensor: 'accelerometer'};
		// deviceRecord.barometer = {sensor: 'barometric pressure'};
        // deviceRecord.magneto = {sensor: 'magnetometer'};
		// // deviceRecord.gyro = {sensor: 'gyroscope'};
        // deviceRecord.keys = {sensor: 'simple keys'};
		// deviceRecord.rhSensor = {sensor: 'humidity'};
		// deviceRecord.irTemp = {sensor: 'IR temperature'};
		
        // deviceRecord.lux = {sensor: 'luxometer'};

		// // then turn on notifications:
		// device.notifySimpleKey();

		// // set a 5-second read sensors interval:
		// setInterval(readSensors, 5000);
	}

	// read all the sensors except the keys:
	function readSensors() {
		// device.readGyroscope(reportGyroscope);
		device.readAccelerometer(reportAccelerometer);
		device.readBarometricPressure(reportBarometricPressure);
        device.readMagnetometer(reportMagnetometer);
		device.readHumidity(reportHumidity);
		device.readIrTemperature(reportIrTemp);		
        device.readLuxometer(reportLuxometer);
        // device.readBatteryLevel(reportBatteryLevel);
        console.log(deviceRecord);
	}

	function reportAccelerometer (error, x, y, z) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.accel.x = x;
		deviceRecord.accel.y = y;
		deviceRecord.accel.z = z;
	}

	function reportBarometricPressure(error, pressure) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.barometer.pressure = pressure.toFixed(1);
	}

	function reportGyroscope(error, x, y, z) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.gyro.x = x.toFixed(1);
		deviceRecord.gyro.y = y.toFixed(1);
		deviceRecord.gyro.z = z.toFixed(1);
	}

	function reportHumidity(error, temperature, humidity) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.rhSensor.temperature = temperature;
		deviceRecord.rhSensor.humidity = humidity;
	}

	function reportIrTemp(error, objectTemperature, ambientTemperature) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.irTemp.objectTemperature = objectTemperature.toFixed(1);
		deviceRecord.irTemp.ambientTemperature = ambientTemperature.toFixed(1);
	}

	function reportMagnetometer(error, x, y, z) {
		// read the three values and save them in the
		// sensor value object:
		deviceRecord.magneto.x = x.toFixed(1);
		deviceRecord.magneto.y = y.toFixed(1);
		deviceRecord.magneto.z = z.toFixed(1);
	}

    function reportLuxometer(error, lux){
        deviceRecord.lux = lux.toFixed(1);
    }

    function reportBatteryLevel(error, batteryLevel){
        deviceRecord.batteryLevel = batteryLevel;
    }

	function reportSimpleKey(left, right) {
		// read the values and save them in the
		// sensor value object:
		deviceRecord.keys.left = left;
		deviceRecord.keys.right = right;
	}

	// Now that you've defined all the functions, start the process.
	// connect to the tag and set it up:
	device.connectAndSetUp(enableSensors);
	// set a listener for when the keys change:
	device.on('simpleKeyChange', reportSimpleKey);
	// set a listener for the tag disconnects:
	device.on('disconnect', disconnect);
}

// setInterval(function() {
// 	for (var id in inRange) {
// 	  if (inRange[id].lastSeen < (Date.now() - EXIT_GRACE_PERIOD)) {
// 		var peripheral = inRange[id].peripheral;
  
// 		// console.log('"' + peripheral.advertisement.localName + '" exited (RSSI ' + peripheral.rssi + ') ' + new Date());
  
// 		delete inRange[id];
// 	  }
// 	}
//   }, EXIT_GRACE_PERIOD / 2);

// listen for tags and handle them when you discover one:
SensorTag.discoverAll(deviceConnected);