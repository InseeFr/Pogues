"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Question
*/

var Component = _interopRequire(require("./Component.js"));

var Filter = _interopRequire(require("./Filter.js"));

var Response = _interopRequire(require("./Response.js"));

var Question = (function (_Component) {
  function Question() {
    _classCallCheck(this, Question);

    _get(Object.getPrototypeOf(Question.prototype), "constructor", this).call(this);
    this._simple = true;
    this._mandatory = false;
    this._filter = new Filter();
    this._response = new Response();
  }

  _inherits(Question, _Component);

  _createClass(Question, {
    simple: {
      get: function () {
        return this._simple;
      },
      set: function (bool) {
        if (typeof bool !== "boolean") {
          throw new Error("The parameter must be a boolean");
        }
        this._simple = bool;
      }
    },
    mandatory: {
      get: function () {
        return this._mandatory;
      },
      set: function (bool) {
        if (typeof bool !== "boolean") {
          throw new Error("The parameter must be a boolean");
        }
        this._mandatory = bool;
      }
    },
    filter: {
      get: function () {
        return this._filter;
      },
      set: function (filter) {
        if (!(filter instanceof Filter)) {
          throw new Error("The argument must be a Filter");
        }
        this._filter = filter;
      }
    },
    response: {
      get: function () {
        return this._response;
      },
      set: function (response) {
        if (!(response instanceof Response)) {
          throw new Error("The argument must be a Response");
        }
        this._response = response;
      }
    }
  });

  return Question;
})(Component);

module.exports = Question;