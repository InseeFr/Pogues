"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Component is the base class for the Questionnaire element
*/

var Declaration = _interopRequire(require("./Declaration.js"));

var Component = (function () {
  function Component() {
    _classCallCheck(this, Component);

    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.name = "";
    this.label = "";
    this.declarations = [];
  }

  _createClass(Component, {
    setName: {
      set: function (name) {
        this.name = name;
      }
    },
    setLabel: {
      set: function (label) {
        this.label = label;
      }
    },
    addDeclaration: {
      value: function addDeclaration(declaration) {
        if (!(declaration instanceof Declaration)) {
          throw new Error("The type of the argument is not Declaration !");
        }
        this.declarations.push(declaration);
      }
    }
  });

  return Component;
})();

module.exports = Component;