"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A control on a response or several responses
*/

var ControlModel = (function () {
  function ControlModel() {
    _classCallCheck(this, ControlModel);

    this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._description = "";
    this._expression = "";
  }

  _createClass(ControlModel, {
    id: {
      get: function () {
        return this._id;
      }
    },
    description: {
      get: function () {
        return this._description;
      },
      set: function (description) {
        if (typeof description !== "string") {
          throw new Error("The parameter must be a string");
        }
        this._description = description;
      }
    },
    expression: {
      get: function () {
        return this._expression;
      },
      set: function (expression) {
        if (typeof expression !== "string") {
          throw new Error("The parameter must be a string");
        }
        this._expression = expression;
      }
    }
  });

  return ControlModel;
})();

module.exports = ControlModel;