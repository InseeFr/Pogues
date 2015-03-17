"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Component is the base class for the Questionnaire element
*/

var Component = function Component() {
  _classCallCheck(this, Component);

  this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
};

module.exports = Component;