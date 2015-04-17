var EventEmitter = require('events').EventEmitter;
var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var QuestionnaireModel = require("../models/Questionnaire");
var SequenceModel = require("../models/Sequence");
var DataUtils = require('../utils/data-utils');
var assign = require('object-assign');
var QUtils = require('../utils/questionnaire-utils');
// FIXME CHANGE_EVENT should be a constant
var CHANGE_EVENT = "change";
var ActionTypes = PoguesConstants.ActionTypes;

var _component;


var ComponentStore = assign({}, EventEmitter.prototype, {
  getComponent: function() {
    return _component;
  },
  emitChange: function() {
    console.log('ComponentStore emitting event', CHANGE_EVENT);
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    console.log('ComponentStore received dispatched payload', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.RECEIVE_NEW_ID_FROM_SERVER:
        // no action, but we want to emit change
        break;

      default:
        return true;
    }
    console.log('Component will emit change, component is', _component);
    ComponentStore.emitChange();
    return true;
  })
});

module.exports = ComponentStore;

