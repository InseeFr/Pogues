var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Logger = require('../logger/logger');

var logger = new Logger('DictionaryStore', 'Stores');

var _language = 'en';
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
  publish: {'en': 'Publish', 'fr': 'Publier'},
  create: {'en': 'Create', 'fr': 'Créer'},
  declaration: {'en': 'Instruction', 'fr': 'Instruction'},
  create_questionnaire: {'en': 'Create a questionnaire', 'fr': 'Créer un questionnaire'},
  select_questionnaire: {'en': 'Select a questionnaire', 'fr': 'Sélectionner un questionnaire'},
  addDeclaration: {'en': 'Add an instruction', 'fr': 'Ajouter une instruction'},
  addControl: {'en': 'Add a control', 'fr': 'Ajouter un contrôle'},
  declarations: {'en': 'Instructions', 'fr': 'Instructions'},
  controls: {'en': 'Controls', 'fr': 'Controls'},
  questionEdition: {'en': 'Edit question properties', 'fr' : 'Éditer les caractéristiques de la question'},
  numType: {'en': 'Number', 'fr': 'Nomber'},
  stringType: {'en': 'String', 'fr': 'Chaîne de caractères'},
  choiceType: {'en': 'Choice', 'fr': 'Choix'},
  QUESTIONNAIRE: {'en': 'Questionnaire', 'fr': 'Questionnaire'},
  MODULE: {'en': 'Module', 'fr': 'Module'},
  PARAGRAPH: {'en': 'Paragraph', 'fr': 'Paragraphe'},
  SEQUENCE: {'en': 'Module', 'fr': 'Module'},
  DATE: {'en': 'Date', 'fr': 'Date'},
  NUMERIC: {'en': 'Number', 'fr': 'Nombre'},
  TEXT: {'en': 'Text', 'fr': 'Texte'},
  INSTRUCTION: {'en': 'Instruction', 'fr': 'Instruction'},
  COMMENT: {'en': 'Comment', 'fr': 'Commentaire'},
  HELP: {'en': 'Help', 'fr': 'Aide'},
  WARNING: {'en': 'Warning', 'fr': 'Avertissement'},
  maxLength: {'en': 'Length', 'fr': 'Taille'},
  pattern: {'en': 'Pattern', 'fr': 'Motif'},
  disjoignable: {'en': 'Detachable instruction', 'fr': 'Instruction détachable'},
  goTo: {'en': 'Goto', 'fr': 'Redirections'},
  defineGoTo: {'en': 'Define a goto', 'fr': 'Définir une redirection'},
  maximum: {'en': 'Maximum', 'fr': 'Maximum'},
  minimum: {'en': 'Minimum', 'fr': 'Minimum'},
  decimals: {'en': 'Decoùams', 'fr': 'Précision'},
  edit_config: {'en': 'Edit config', 'fr': 'Éditer les paramètres'},
  description: {'en': 'Description', 'fr': 'Description'},
  expression: {'en': 'Condition', 'fr': 'Condition'},
  target: {'en': 'Target', 'fr': 'Cible'},
  ifTrue: {'en': 'Target if condition is true', 'fr': 'Cible si la condition est vérifiée'},
  ifFalse: {'en': 'Target if condition is false', 'fr': 'Cible si la condition n\'est pas vérifiée'},
  dev: {'en': 'dev', 'fr': 'dev'},
  remote: {'en': 'remote', 'fr': 'remote'},
  baseURL: {'en': 'baseURL', 'fr': 'baseURL'},
  poguesPath: {'en': 'poguesPath', 'fr': 'poguesPath'},
  persistPath: {'en': 'persistPath', 'fr': 'persistPath'},
  stromaePath: {'en': 'stromaePath', 'fr': 'stromaePath'},
  logLevel: {'en': 'logLevel', 'fr': 'logLevel'},
  logActiveNamespaces: {'en': 'logActiveNamespaces', 'fr': 'logActiveNamespaces'},
  trueWord: {'en': 'True', 'fr': 'Vrai'},
  falseWord: {'en': 'False', 'fr': 'Faux'},
  datatypeEdition: {'en': 'Expected datatype', 'fr' : 'Type de données attendu'},
  responsesEdition: {'en': 'Responses', 'fr': 'Réponses'},
  addResponse: {'en': 'Add a response', 'fr': 'Ajouter une réponse'},
  visualizationHint : {'en': 'Visualization hint', 'fr': 'Type de saisie'},
  newCode: {'en': 'New code', 'fr' : 'Nouvelle catégorie'},
  typeNewCode: {'en': 'Type a new code', 'fr': 'Entrez une nouvelle catégorie'},
  newCl: {'en': 'New code list', 'fr': 'Nouvelle liste de codes'},
  placeholderDeclarationText: {'en': 'Here, your declaration', 'fr' : 'Ici, votre déclaration'}
};

//initialization

setDictionary(_language);

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
    logger.debug('Store emitting change event');
    this.emit(CHANGE_EVENT);
  },
  getDictionary: function () {
    return _localDictionary;
  },
  setLanguage: setLanguage,
  dispatcherIndex: PoguesDispatcher.register(function(payload) {
    logger.debug('Received dispatched payload: ', payload);
    var action = payload.action; // action from HandleViewAction
    switch(action.actionType) {
      case ActionTypes.LANGUAGE_CHANGED:
        //_addSequence(payload.action.spec.text);
        setLanguage(payload.action.language);
        break;

      default:
        return true;
    }
    logger.debug('Store will emit change, language is: ', _language);
    DictionaryStore.emitChange();
    return true;
  })
});

module.exports = DictionaryStore;
