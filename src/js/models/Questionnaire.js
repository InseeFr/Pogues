"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
The class for a Questionnaire
*/

var Questionnaire = (function () {
  function Questionnaire(name) {
    _classCallCheck(this, Questionnaire);

    // TODO
    this.name = name;
    this.sequences = [];
  }

  _createClass(Questionnaire, {
    getName: {
      get: function () {
        return this.name;
      }
    }
  });

  return Questionnaire;
})();

module.exports = Questionnaire;