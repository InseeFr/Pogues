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
  }
};

module.exports = QuestionnaireUtils;
