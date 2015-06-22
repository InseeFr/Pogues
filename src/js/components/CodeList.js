var React = require('react');
var Component = require('../components/component');
var CodeListModel = require('../models/CodeList');
var classNames = require('classnames');


var CodeList = React.createClass({

  propTypes: {
    codeList : React.PropTypes.instanceOf(CodeListModel)
  },

  getInitialState: function() {
    return {};
  },


  render: function() {
    var classes = classNames({
    });
    return (
      <div>
      </div>
    );
  }
});

module.exports = CodeList;


