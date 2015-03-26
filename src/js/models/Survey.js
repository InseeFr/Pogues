"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Survey
*/

var Survey = (function () {
  function Survey() {
    _classCallCheck(this, Survey);

    this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._agency = "fr.insee";
    this._name = "";
  }

  _createClass(Survey, {
    id: {
      get: function () {
        return this._id;
      }
    },
    name: {
      get: function () {
        return this._name;
      },

      // TODO do we need a setter for id?

      set: function (name) {
        if (typeof name !== "string") {
          throw new Error("The parameter must be a string");
        }
        this._name = name;
      }
    },
    agency: {
      get: function () {
        return this._agency;
      },
      set: function (agency) {
        if (typeof agency === "string") {
          throw new Error("The parameter must be a string");
        }
        this._agency = agency;
      }
    }
  });

  return Survey;
})();

module.exports = Survey;