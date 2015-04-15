var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();
var DataUtils = require('../utils/data-utils');
// start of hack
var request = require('superagent');
var Config = require('../config/config');
var QuestionnaireModel = require("../models/Questionnaire");
var QuestionModel = require("../models/Question");
var SequenceModel = require("../models/Sequence");
// end of hack
//  Short name rule
var rName = /^[a-z0-9_]*$/i;
var rNameNeg = /[^a-z0-9_]/gi;


function nameFromLabel(label) {
        return label.replace(rNameNeg, '').toUpperCase().slice(0, 10);
    }
    // TODO add change listener on dictionary store  to have a clean
    // process, even if you don't expect changes in language settings
var QuestionnaireEditor = React.createClass({

    getInitialState: function() {
        return {
            label: '',
            name: '',
            nameEdited: false
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
        var label = event.target.value,
            name = this.state.nameEdited ? this.state.name : nameFromLabel(label);
        this.setState({
            label: label,
            name: name
        });
    },
    _disableNameGeneration: function() {
        this.setState({
            label: this.state.label,
            name: this.state.name,
            nameEdited: true
        });
    },
    _handleNameChange: function(event) {
        var text = event.target.value.toUpperCase();
        if (!rName.test(text)) return;
        this.setState({
            name: text
        });
    },
    _addQuestionnaire: function() {
        // TODO check if name and label are not empty
    PoguesActions.createQuestionnaireLocal(this.state.name, this.state.label);
    //PoguesActions.createQuestionnaireDistant();
    // go to questionnaire view
    PoguesActions.switchToQuestionnaire();
        this.setState({
            label: '',
            name: '',
            nameEdited: false
        });
    },
    // FIXME hack function, temporary
    _hack: function(event) {
      var fakeQ = new QuestionnaireModel();
      DataUtils.populateFakeQuestionnaire(fakeQ);
      DataUtils.publishQuestionnaire(fakeQ);
      event.preventDefault();
    },
    render: function() {
        var additionalControls = '';
        if (this.state.active) additionalControls = 'More controls here';
        return (
          <div>
            <div className="form-group">
                <label for="name">{locale.name}</label>
                <input className="form-control"
                  type="text" value={this.state.name}
                  ref="input"
                  placeholder={locale.phName} onChange={this._handleNameChange}
                  onKeyPress={this._disableNameGeneration}/>
            </div>
            <div className="form-group">
                <label for="name">{locale.label}</label>
              <input className="form-control"
                type="text" value={this.state.label}
                placeholder={locale.phLabel} onChange={this._handleLabelChange}/>
            </div>
            <button className="btn btn-primary" type="button"
                onClick={this._addQuestionnaire}>
                {locale.create}
            </button>
            <button className="btn btn-danger" type="button"
                onClick={this._hack}>
                Hack generate
            </button>
            <h3>{additionalControls}</h3>
      </div>
      );
}
});

module.exports = QuestionnaireEditor;
