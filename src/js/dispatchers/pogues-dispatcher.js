import PoguesConstants from '../constants/pogues-constants';
import {Dispatcher} from 'flux'
import assign from 'object-assign';
import Logger from '../logger/logger';

var logger = new Logger('PoguesDispatcher','Dispatcher');

var PayloadSources = PoguesConstants.PayloadSources;

var PoguesDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_SOURCE,
      action: action
    };
    logger.info('PoguesDispatcher dispatching SERVER_SOURCE payload', payload);
    this.dispatch(payload);
  },
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_SOURCE,
      action: action
    };
    logger.info('PoguesDispatcher dispatching VIEW_SOURCE payload', payload);
    this.dispatch(payload);
  },

});

module.exports = PoguesDispatcher;
