"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A control on a response or several responses
*/

var Control = (function () {
  function Control() {
    _classCallCheck(this, Control);

    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.description = "";
    this.expression = "";
  }

  _createClass(Control, {
    getDescription: {
      get: function () {
        return this.description;
      }
    },
    getExpression: {
      get: function () {
        return this.expression;
      }
    },
    setDescription: {
      set: function (description) {
        if (!(typeof description === "string")) {
          throw new Error("The parameter must be a string");
        }
        this.description = description;
      }
    },
    setExpression: {
      set: function (expression) {
        if (!(typeof expression === "string")) {
          throw new Error("The parameter must be a string");
        }
        this.expression = expression;
      }
    }
  });

  return Control;
})();

module.exports = Control;