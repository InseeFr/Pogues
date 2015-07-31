import EventEmitter from 'events'
import assign from 'object-assign'
import PoguesDispatcher from '../dispatchers/pogues-dispatcher'
import CodeListModel from '../models/code-list'
import Logger from '../logger/logger'
import PoguesConstants from '../constants/pogues-constants'

const CHANGE_EVENT = "change";
const logger = new Logger('CodeListStore', 'Stores');
const ActionTypes = PoguesConstants.ActionTypes;

/* Private array containing all the known code lists */
const _codeLists = [];

// For demo purpose, let's add some code list
_codeLists.push(new CodeListModel({
  _id: 'cl_propsal',
  _name: 'cl_propsal',
  _label: 'Proportion de salaire',
  _codes: [
    {value: 0, label: 'La moitié ou plus'},
    {value: 1, label: 'Moins de la moitié'}
  ]}));

_codeLists.push(new CodeListModel({
  _id: 'cl_sexe',
  _name: 'cl_sexe',
  _label: 'Sexe',
  _codes: [
    {value: 0, label: 'Homme'},
    {value: 1, label: 'Femme'}
  ]
}));

export function getCodeListsFromStore() {
  return _codeLists;
}

const CodeListStore = assign({}, EventEmitter.prototype,  {
  emitChange: function() {
    logger.debug('Store emitting change event, state is now', _codeLists);
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    logger.debug('Received dispatched payload: ', payload);
    var action = payload.action;
    switch(action.actionType) {
      case ActionTypes.CREATE_CODE_LIST:
        _codeLists.push(action.codeList);
        break;
      default:
        //no-op
    }
    logger.info('Will emit change.');
    CodeListStore.emitChange();
    return true;
  })
});

export default CodeListStore;
