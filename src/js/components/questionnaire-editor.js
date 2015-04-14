var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();
//  Short name rule
var rName = /^[a-z0-9_]*$/i;

// TODO add change listener on dictionary store  to have a clean
// process, even if you don't expect changes in language settings
var QuestionnaireEditor = React.createClass({

  getInitialState: function() {
    return {
      label: '',
      name: ''
    };
  },
  componentDidMount: function() {
    this.refs.input.getDOMNode().focus();
  },
  // TODO Reintegrate ENTER KEY handling (taking care of conflict
  // with _handleChange). Removed for the sake of simplicity.
/*	_handleKeyDown: function(event) {
    if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
      this._addQuestionnaire(this.state.name);
    }
  },*/
  _handleLabelChange: function(event) {
    this.setState({
      label: event.target.value
    });
  },
  _handleNameChange: function(event) {
    var text = event.target.value.toUpperCase();
    if (!rName.test(text)) return;
    this.setState({
      name: text
    });
  },
  _addQuestionnaire: function () {
    PoguesActions.createQuestionnaire(this.state)
    this.setState({
      value: ''
    });
  },
  render: function() {
    var additionalControls = '';
    if (this.state.active) additionalControls = 'More controls here';
    return (
      <div>
        <div className="form-group">
            <label for="name">{locale.label}</label>
          <input className="form-control"
            type="text" ref="input" value={this.state.label}
            placeholder={locale.phLabel} onChange={this._handleLabelChange}/>
        </div>
        <div className="form-group">
            <label for="name">{locale.name}</label>
          <input className="form-control"
            type="text" value={this.state.name}
            placeholder={locale.phName} onChange={this._handleNameChange}/>
        </div>
        <button className="btn btn-default" type="button"
            onClick={this._addQuestionnaire}>
            {locale.add}
        </button>
        <h3>{additionalControls}</h3>
      </div>
    );
  }
});

module.exports = QuestionnaireEditor;