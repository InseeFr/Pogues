"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
Textual material associated to a sequence or question
*/
// FIXME do we put that in constants dir?
var TYPES = ["INSTRUCTION", "COMMENT", "HELP"];

var Declaration = (function () {
  function Declaration() {
    _classCallCheck(this, Declaration);

    this._type = "";
    this._disjoinable = true;
    this._text = "";
  }

  _createClass(Declaration, {
    type: {
      get: function () {
        return this._type;
      },
      set: function (type) {
        if (!(type in TYPES)) {
          throw new Error(type + "is not a valid declaration type");
        }
        this._type = type;
      }
    },
    disjoinable: {
      get: function () {
        return this._disjoinable;
      },
      set: function (bool) {
        if (typeof bool !== "boolean") {
          throw new Error("The parameter must be a boolean");
        }
        this._disjoinable = bool;
      }
    },
    text: {
      get: function () {
        return this._text;
      },
      set: function (text) {
        if (typeof text !== "string") {
          throw new Error("The parameter must be a string");
        }
        this._text = text;
      }
    }
  });

  return Declaration;
})();

module.exports = Declaration;