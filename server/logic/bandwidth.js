var catapult = require('../bandwidthConfig');
var Promise = require('bluebird');
var Application = Promise.promisifyAll(catapult.Application);
var PhoneNumber = Promise.promisifyAll(catapult.PhoneNumber);
var AvailableNumber = Promise.promisifyAll(catapult.AvailableNumber);

module.exports.sendMessage = function (){};

module.exports.createApplication = function () {};

module.exports.setCallBackURL = function () {};


//Checks the current Applications to see if we have one.
module.exports.configureApplication = function () {
	return Application.listAsync(client, {
		size: 1000
	})
	.then(function (applications) {
		var applicationId = searchForApplication(applications, appName);
		if(applicationId !== false) {
			return fetchTNByAppId(applicationId);
		}
		else {
			return newApplication();
		}
	});
};

// Searches through application names and returns ID if matched
module.exports.searchForApplication = function (applications, name) {
	for (var i = 0; i < applications.length; i++) {
			if ( applications[i].name === name) {
				return applications[i].id;
			}
		}
	return false;
};

// Gets the first number associated with an application
module.exports.fetchTNByAppId = function (applicationId) {
	return PhoneNumber.listAsync(client, {
		applicationId: applicationId
	})
	.then(function (numbers) {
		tn = numbers[0].number;
	});
};

// Creates a new application then orders a number and assigns it to application
module.exports.newApplication =function () {
	var applicationId;
	return Application.createAsync(client, {
			name: appName,
			incomingCallUrl: config.baseUrl + "/incomingCall/",
      incomingMessageUrl: config.baseUrl + "/incomingMessage"
			callbackHttpMethod: "get",
			autoAnswer: true
		})
		.then(function(application) {
			//search an available number
			applicationId = application.id;
			return AvailableNumber.searchLocalAsync(client, {
				areaCode: "415",
				quantity: 1
			});
		})
		.then(function(numbers) {
			// and reserve it
			tn = numbers[0].number;
			return PhoneNumber.createAsync(client, {
				number: tn,
				applicationId: applicationId
			});
		});
