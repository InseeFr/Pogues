"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Control = function Control() {
  _classCallCheck(this, Control);

  this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  this.description = "";
  this.expression = "";
};

module.exports = Control;