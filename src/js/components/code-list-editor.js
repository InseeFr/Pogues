var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var CodeListModel = require('../models/code-list')
// TODO rename mocked list
var clr = require('../utils/code-list-repository')

var CodeListEditor = React.createClass({
  propTypes: {
    // make the newly created code list the current item in its parents
    // (ie response editor). Not provided when edition an existing codeList
    choose: React.PropTypes.func,
    // clId is not provided when creating a codeList
    clId : React.PropTypes.string
  },

  componentWillMount: function() {
    var cl
    this.setState({
      clId: this.props.clId ? clr.getFromId(this.props.id) : (cl = new CodeListModel())
    })
  },

  render: function() {
    return (

    );
  }

});

module.exports = CodeListEditor;