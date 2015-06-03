var React = require('react');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();

var ConfigEditor = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
    };
  },

  componentWillMount: function() {
    this.setState({

    });
  },
  _clickToPicker: function (event) {
    PoguesActions.switchToPicker();
    event.preventDefault();
  },

  render: function() {
    return (
        <div className="container bs-docs-container">
          <div className="col-md-12">
            <h1 className="page-header">{locale.edit_config}</h1>
            <button className="btn btn-primary" onClick={this._clickToPicker}>
              Back to questionnaire picker
            </button>
          </div>
        </div>
      );
  }
})

module.exports = ConfigEditor;