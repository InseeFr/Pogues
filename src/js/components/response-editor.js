var React = require('react');
var ResponseModel = require('../models/Response');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');

var ResponseEditor = React.createClass({
  // TODO save
  propTypes: {
    question: React.PropTypes.instanceOf(QuestionModel)
  },

  componentWillMount: function() {
    this.setState({

    });
  },

  render: function() {
    return (
      <div>
      </div>
    );
  }

});

module.exports = ResponseEditor;