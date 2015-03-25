"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Survey
*/

var Survey = (function () {
  function Survey() {
    _classCallCheck(this, Survey);

    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.agency = "fr.insee";
    this.name = "";
  }

  _createClass(Survey, {
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
    getAgency: {
      get: function () {
        return this.name;
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
    setAgency: {
      set: function (agency) {
        if (!(typeof agency === "string")) {
          throw new Error("The parameter must be a string");
        }
        this.agency = agency;
      }
    }
  });

  return Survey;
})();

module.exports = Survey;