var SequenceModel = require('../models/Sequence');
var QuestionModel = require('../models/Question');

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
    console.log('searching for key :' + key + ' and value : ' + value);

    for (var i in struct) {
      var component = struct[i];
      if (component instanceof QuestionModel) {
        if (component[key] === value) {
          console.log('found!');
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

  /*
   Appends a component (sequence or question) to a sequence at a certain depth.
   @param sequence The sequence (or questionnaire) to which the component is added
   @param isSequence Boolean indicating if the component to create is a sequence or a question
   @param depth Integer giving the distance from the root where the component should be added
   @param title Title of the component to append
   */
  appendComponent: function(sequence, isSequence, depth, title) {

    if (depth === 1) {
      var newChild = (isSequence) ? new SequenceModel() : new QuestionModel();
      newChild.name = title;
      sequence.addChild(newChild);
      return;
    } else if (depth > 1) {
      // find last sequence child of sequence
      if (sequence.children.length === 0) return;
      for (var index = sequence.children.length - 1; index >= 0; index--) {
        if (sequence.children[index] instanceof SequenceModel) {
          QuestionnaireUtils.appendComponent(sequence.children[index], isSequence, depth - 1, title);
          return;
        }
      }
    }
    return;
  }
};

module.exports = QuestionnaireUtils;
