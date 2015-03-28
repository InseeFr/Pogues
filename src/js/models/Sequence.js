"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Sequence of questions or other sequences
*/

var ComponentModel = _interopRequire(require("./Component.js"));

// FIXME Internationalize
var GENERIC_NAMES = ["Questionnaire", "Module", "Paragraphe", "Séquence"];

var SequenceModel = (function (_ComponentModel) {
  function SequenceModel() {
    _classCallCheck(this, SequenceModel);

    _get(Object.getPrototypeOf(SequenceModel.prototype), "constructor", this).call(this);
    this._depth = 0;
    // Module, paragraph, etc. Should really not be a member, in fact.
    this._genericName = GENERIC_NAMES[0];
    this._children = [];
  }

  _inherits(SequenceModel, _ComponentModel);

  _createClass(SequenceModel, {
    depth: {
      get: function () {
        return this._depth;
      },
      set: function (depth) {
        // TODO Add type check
        this._depth = depth;
        if (depth < GENERIC_NAMES.length - 1) this._genericName = GENERIC_NAMES[depth];else this._genericName = GENERIC_NAMES[GENERIC_NAMES.length - 1] + "-" + depth;
      }
    },
    genericName: {
      get: function () {
        return this._genericName;
      }
    },
    children: {
      get: function () {
        return this._children;
      },
      set: function (children) {
        children.map(function (child) {
          if (!(child instanceof ComponentModel)) {
            throw new Error("All arguments must be of type Component");
          }
        });
        this._children = children;
      }
    },
    addChild: {
      value: function addChild(child) {
        if (!(child instanceof ComponentModel)) {
          throw new Error("The argument must be a Component");
        }
        if (child instanceof SequenceModel) child.setDepth(this._depth + 1);

        this._children.push(child);
      }
    },
    addChildren: {
      value: function addChildren(children) {
        // Save current size in case something goes wrong
        var initialSize = this._children.length;
        try {
          children.map(function (child) {
            this.addChild(child);
          });
        } catch (e) {
          this._children.length(initialSize);
          throw new Error("All arguments must be of type Component");
        }
      }
    }
  });

  return SequenceModel;
})(ComponentModel);

module.exports = SequenceModel;