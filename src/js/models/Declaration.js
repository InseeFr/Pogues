"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// FIXME do we put that in constants dir ?
var TYPES = ["INSTRUCTION", "COMMENT", "HELP"];

var Declaration = (function () {
  function Declaration() {
    _classCallCheck(this, Declaration);

    this.type = "";
    this.disjoinable = true;
    this.text = "";
  }

  _createClass(Declaration, {
    setType: {
      set: function (type) {
        if (!(type in TYPES)) {
          throw new Error("You must choose a valid declaration type !");
        }
        this.type = type;
      }
    },
    setDisjoinable: {
      set: function (bool) {
        if (!(typeof bool === "boolean")) {
          throw new Error("Disjoinable must be a boolean !");
        }
        this.disjoinable = bool;
      }
    },
    setText: {
      set: function (text) {
        if (!(typeof bool === "string")) {
          throw new Error("Declaration text must be a string !");
        }
        this.text = text;
      }
    }
  });

  return Declaration;
})();

module.exports = Declaration;