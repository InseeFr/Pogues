"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A response to a question
*/

var Response = (function () {
  function Response() {
    _classCallCheck(this, Response);

    this._simple = true;
    this._predefinedLabels = [];
    this._values = [];
  }

  _createClass(Response, {
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
    predefinedLabels: {
      get: function () {
        return this._predefinedLabels;
      },
      set: function (predefinedLabels) {
        try {
          predefinedLabels.map(function (predefinedLabel) {
            if (typeof predefinedLabel !== "string") {
              throw new Error("All arguments must be of type string");
            }
          });
        } catch (e) {
          throw new Error("All arguments must be strings");
        }
        this._predefinedLabels = predefinedLabels;
      }
    },
    values: {
      get: function () {
        return this._values;
      },
      set: function (values) {
        // We just check that 'values' is an array
        if (!Array.isArray(values)) {
          throw new Error("The argument must be an array");
        }
        this._values = values;
      }
    },
    addPredefinedLabel: {
      value: function addPredefinedLabel(predefinedLabel) {
        if (typeof predefinedLabel !== "string") {
          throw new Error("The argument must be a string");
        }
        this._predefinedLabels.push(predefinedLabel);
      }
    },
    addPredefinedLabels: {
      value: function addPredefinedLabels(predefinedLabels) {
        // Save current size in case something goes wrong
        var initialSize = this._predefinedLabels.length;
        try {
          predefinedLabels.map(function (predefinedLabel) {
            this.addPredefinedLabel(predefinedLabel);
          });
        } catch (e) {
          this._predefinedLabels.length(initialSize);
          throw new Error("All arguments must be of type string");
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
        this._values.concat(values);
      }
    }
  });

  return Response;
})();

module.exports = Response;