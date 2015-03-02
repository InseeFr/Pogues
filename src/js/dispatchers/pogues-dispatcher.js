var PoguesConstants = require('../constants/pogues-constants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = PoguesConstants.PayloadSources;

var PoguesDispatcher = assign(new Dispatcher(), {

	handleServerAction: function(action) {
		var payload = {
			source: PayloadSources.SERVER_SOURCE,
			action: action
		};
		console.log('PoguesDispatcher dispatching SERVER_SOURCE payload', payload);
		this.dispatch(payload);
	},
	handleViewAction: function(action) {
		var payload = {
			source: PayloadSources.VIEW_SOURCE,
			action: action
		};
		console.log('PoguesDispatcher dispatching VIEW_SOURCE payload', payload);
		this.dispatch(payload);
	},

});

module.exports = PoguesDispatcher;