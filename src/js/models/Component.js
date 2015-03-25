"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Component is the base class for the Questionnaire questions and sequences
*/

var Declaration = _interopRequire(require("./Declaration.js"));

var Component = (function () {
  function Component() {
    _classCallCheck(this, Component);

    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    console.log("Component creating new instance with id " + this.id);
    this.name = "";
    this.label = "";
    this.declarations = [];
  }

  _createClass(Component, {
    getId: {
      get: function () {
        return this.id;
      }
    },
    getName: {
      get: function () {
        return this.name;
      }
    },
    getLabel: {
      get: function () {
        return this.label;
      }
    },
    getDeclarations: {
      get: function () {
        return this.declarations;
      }
    },
    setName: {

      // TODO do we need a setter for id?

      set: function (name) {
        if (!(typeof name === "string")) {
          throw new Error("The parameter must be a string");
        }
        this.name = name;
      }
    },
    setLabel: {
      set: function (label) {
        if (!(typeof label === "string")) {
          throw new Error("The parameter must be a string");
        }
        this.label = label;
      }
    },
    addDeclaration: {
      value: function addDeclaration(declaration) {
        if (!(declaration instanceof Declaration)) {
          throw new Error("The argument must be a Declaration");
        }
        this.declarations.push(declaration);
      }
    },
    addDeclarations: {
      value: function addDeclarations(declarations) {
        // Save current size in case something goes wrong
        initialSize = this.declarations.length;
        try {
          declarations.map(function (declaration) {
            this.addDeclaration(declaration);
          });
        } catch (e) {
          this.declarations.length(initialSize);
          throw new Error("All arguments must be of type Declaration");
        }
      }
    },
    setDeclarations: {
      set: function (declarations) {
        children.map(function (declaration) {
          if (!(declaration instanceof Declaration)) {
            throw new Error("All arguments must be of type Declaration");
          }
        });
        this.declarations = declarations;
      }
    }
  });

  return Component;
})();

module.exports = Component;