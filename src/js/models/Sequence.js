"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
A Sequence of questions or other sequences
*/

var Component = _interopRequire(require("./Component.js"));

// FIXME Internationalize
var GENERIC_NAMES = ["Questionnaire", "Module", "Paragraphe", "Séquence"];

var Sequence = (function (_Component) {
  function Sequence() {
    _classCallCheck(this, Sequence);

    _get(Object.getPrototypeOf(Sequence.prototype), "constructor", this).call(this);
    this.depth = 0;
    // Module, paragraph, etc. Should really not be a member, in fact.
    this.genericName = GENERIC_NAMES[0];
    this.children = [];
  }

  _inherits(Sequence, _Component);

  _createClass(Sequence, {
    getDepth: {
      get: function () {
        return this.depth;
      }
    },
    setDepth: {
      set: function (depth) {
        // TODO Add type check
        this.depth = depth;
        if (depth < GENERIC_NAMES.length - 1) this.genericName = GENERIC_NAMES[depth];else this.genericName = GENERIC_NAMES[GENERIC_NAMES.length - 1] + "-" + depth;
      }
    },
    addChild: {
      value: function addChild(child) {
        if (!(child instanceof Component)) {
          throw new Error("The argument must be a Component");
        }
        if (child instanceof Sequence) child.setDepth(this.depth + 1);

        this.children.push(child);
      }
    },
    addChildren: {
      value: function addChildren(children) {
        // Save current size in case something goes wrong
        initialSize = this.declarations.length;
        try {
          children.map(function (child) {
            this.addChild(child);
          });
        } catch (e) {
          this.children.length(initialSize);
          throw new Error("All arguments must be of type Component");
        }
      }
    },
    setChildren: {
      set: function (children) {
        children.map(function (child) {
          if (!(child instanceof Component)) {
            throw new Error("All arguments must be of type Component");
          }
        });
        this.children = children;
      }
    }
  });

  return Sequence;
})(Component);

module.exports = Sequence;