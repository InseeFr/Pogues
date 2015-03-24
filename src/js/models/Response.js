"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A response to a question
*/

var Response = (function () {
  function Response() {
    _classCallCheck(this, Response);

    this.simple = true;
    this.predefinedLabels = [];
    this.values = [];
  }

  _createClass(Response, {
    getSimple: {

      // TODO Should it be 'get' or 'is' for booleans?

      get: function () {
        return this.simple;
      }
    },
    setSimple: {
      set: function (bool) {
        if (!(typeof bool === "boolean")) {
          throw new Error("The parameter must be a boolean");
        }
        this.simple = bool;
      }
    },
    addPredefinedLabel: {
      value: function addPredefinedLabel(predefinedLabel) {
        if (!(typeof predefinedLabel === "string")) {
          throw new Error("The argument must be a string");
        }
        this.predefinedLabels.push(predefinedLabel);
      }
    },
    setPredefinedLabels: {
      set: function (predefinedLabel) {
        // Save current size in case something goes wrong
        initialSize = this.predefinedLabels.length;
        try {
          predefinedLabels.map(function (predefinedLabel) {
            this.addPredefinedLabel(predefinedLabel);
          });
        } catch (e) {
          this.predefinedLabels.length(initialSize);
          throw new Error("All arguments must be strings");
        }
      }
    },
    addValue: {
      value: function addValue(value) {
        // No type check for response values
        this.values.push(value);
      }
    },
    addValues: {
      value: function addValues(values) {
        // We just check that 'values' is an array
        if (!Array.isArray(values)) {
          throw new Error("The argument must be an array");
        }
        this.values.concat(values);
      }
    },
    setValues: {
      set: function (declarations) {
        // We just check that 'values' is an array
        if (!Array.isArray(values)) {
          throw new Error("The argument must be an array");
        }
        this.values = values;
      }
    }
  });

  return Response;
})();

module.exports = Response;