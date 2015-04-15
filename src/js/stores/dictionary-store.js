var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _language = null;
var _localDictionary;
var ActionTypes = PoguesConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _dictionary = {
  phLabel: {'en': 'Enter a title for the questionnaire', 'fr': 'Entrez un titre pour le questionnaire'},
  phName:  {'en': 'Enter an ID for the questionnaire', 'fr': 'Entrez un identifiant pour le questionnaire'},
  label: {'en': 'Title', 'fr': 'Titre'},
  name:  {'en': 'Id', 'fr': 'Identifiant'},
  add: {'en': 'Add', 'fr': 'Ajouter'},
  tagline: {'en': 'Questionnaire design and test', 'fr': 'Conception et test de questionnaires'},
  introduction: {'en': 'Please specify your questionnaire', 'fr': 'Veuillez spécifier votre questionnaire'},
  errorMessageQuest: {'en': 'Could not retrieve the questionnaire', 'fr': 'Impossible de récupérer le questionnaire'},
  search: {'en': 'Search', 'fr': 'Chercher'},
  inviteExisting: {'en': 'Select an existing questionnaire', 'fr': 'Sélectionner un questionnaire existant'},
  errorMessageQuestList: {'en': 'Could not retrieve questionnaire list', 'fr': 'Impossible de récupérer la liste des questionnaires'},
  enterTitle: {'en': 'Enter a title', 'fr': 'Entrez un intitulé'},
  sequence: {'en': 'Sequence', 'fr': 'Séquence'},
  question: {'en': 'Question', 'fr': 'Question'},
  save: {'en': 'Save', 'fr': 'Sauvegarder'},
  create: {'en': 'Create', 'fr': 'Créer'},
  create_questionnaire: {'en': 'Create a questionnaire', 'fr': 'Créer un questionnaire'},
  select_questionnaire: {'en': 'Select a questionnaire', 'fr': 'Sélectionner un questionnaire'}
};

function setDictionary(language) {
  var locale = {};
  for (var k in _dictionary) {
    locale[k] = _dictionary[k][language]
  }
  _localDictionary = locale;
}

function setLanguage(language) {
  _language = language;
  setDictionary(language);
}


var DictionaryStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    console.log('DictionaryStore emitting event', CHANGE_EVENT);
    this.emit(CHANGE_EVENT);
  },
  getDictionary: function () {
    return _localDictionary;
  },
  setLanguage: setLanguage,
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    console.log('QuestionnaireStore received dispatched payload', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.LANGUAGE_CHANGED:
        //_addSequence(payload.action.spec.text);
        setLanguage(payload.action.language);
        break;

      default:
        return true;
    }
    console.log('DictionaryStore will emit change, language is', _language);
    DictionaryStore.emitChange();
    return true;
  })
});

module.exports = DictionaryStore;
