import SequenceModel from '../models/sequence';
import QuestionModel from '../models/question';
import QuestionnaireModel from '../models/questionnaire';
import {nameFromLabel} from '../utils/name-utils';
import Logger from '../logger/logger';

var logger = new Logger('QuestionnaireUtils', 'Utils');

function flatten(quesr) {
    return quesr.children.reduce(function(a, b) {
        return a.concat(b.children ? [b].concat(flatten(b)) : [b]);
    }, []);
  }

var QuestionnaireUtils = {
  /*
   Search a component by id and apply a function to it.
   @param struct : the data structure in which we're looking up
   @param key : the key containing the value
   @param value : the *unique* value use to select a component
   @param func : the function to apply to the found element
   */
   //TODO currying ! functionnal !
   //TODO struct.flatMap.filter( checkId ).apply( func )
  searchAndApply : function (struct, key, value, func) {
    logger.debug('searching for key :' + key + ' and value :' + value);

    for (var i in struct) {
      var component = struct[i];
      if (component instanceof QuestionModel) {
        if (component[key] === value) {
          logger.debug('Found key ' + key + ' in component:', component);
          func(component);
        }
      }
      if (component instanceof SequenceModel) {
        if (component[key] === value) {
          func(component);
        } else {
          QuestionnaireUtils.searchAndApply(component.children, key, value, func);
        }
      }
    }
  },


  getComponentById: function (questionnaire, cmpntId) {
    var candidate;
    return flatten(questionnaire).some(function (c) {
      return (candidate = c, c.id === cmpntId)
    }) ? candidate : null;
  },

  getComponentByName: function (questionnaire, cmpntName) {
    var candidate;
    return flatten(questionnaire).some(function (c) {
      return (candidate = c, c.name === cmpntName)
    }) ? candidate : null;
  },

  pickComponent: function pickComponent(quesr){
    return quesr.children[0];
  },

  flatten: flatten,

  after: function (questionnaire, component) {
    var cmpnts = flatten(questionnaire)
    var i = cmpnts.indexOf(component)
    if (i !== -1) return cmpnts.slice(i + 1)
    return []
  },

  pickQuestion: function pickQuestion(quesr){
    var candidate;
    return (flatten(quesr).some(function (el) {
        return (candidate = el, !el.depth);
      }, this), candidate);
  },

  /*
   Appends a component (sequence or question) to a sequence at a certain depth.
   @param sequence The sequence (or questionnaire) to which the component is added
   @param isSequence Boolean indicating if the component to create is a sequence or a question
   @param depth Integer giving the distance from the root where the component should be added
   @param label Title of the component to append
   */
  appendComponent: function(sequence, isSequence, depth, label) {

    if (depth === 1) {
      var newChild = (isSequence) ? new SequenceModel() : new QuestionModel();
      newChild.label = label;
      // TODO generate newChild.name !
      newChild.name = nameFromLabel(label);
      logger.debug('Appending new child: ', newChild);
      sequence.addChild(newChild);
      return;
    } else if (depth > 1) {
      // find last sequence child of sequence
      if (sequence.children.length === 0) return;
      for (var index = sequence.children.length - 1; index >= 0; index--) {
        if (sequence.children[index] instanceof SequenceModel) {
          QuestionnaireUtils.appendComponent(sequence.children[index], isSequence, depth - 1, label);
          return;
        }
      }
    }
    return;
  }
};

module.exports = QuestionnaireUtils;
