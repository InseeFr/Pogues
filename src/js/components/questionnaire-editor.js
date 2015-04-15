var React = require('react');
var PoguesConstants = require('../constants/pogues-constants');
var PoguesActions = require('../actions/pogues-actions');
var locale = require('../stores/dictionary-store').getDictionary();
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

function fakeQuestionnaire(questionnaire) {
    var numberOfSequences = Math.floor(Math.random() * 10);
    for (var sequenceIndex = 1; sequenceIndex <= numberOfSequences; sequenceIndex++) {
        var sequence = new SequenceModel();
        sequence.name = 'dqsfdsq' + sequenceIndex;
        sequence.depth = 1;
        var numberOfChildren = Math.floor(Math.random() * 5);
        for (var childIndex = 1; childIndex <= numberOfChildren; childIndex++) {
            var childNumber = sequenceIndex * 10 + childIndex;
            var child = null;
            if (Math.random() < 0.5) {
                child = new QuestionModel();
                child.name = 'sdqfdsf' + childNumber;
                child.label = 'sqdfdfsqd' + childNumber;
                sequence.addChild(child);
            } else {
                child = new SequenceModel();
                child.name = 'Séquence numéro ' + childNumber;
                var numberOfQuestions = Math.floor(Math.random() * 5);
                for (var questionIndex = 1; questionIndex <= numberOfQuestions; questionIndex++) {
                    var questionNumber = childNumber * 10 + questionIndex;
                    var question = new QuestionModel();
                    question.name = 'Questionnumero' + questionNumber;
                    question.label = 'sdqfdsnclaquestionnumero' + questionNumber;
                    child.addChild(question);
                }
                sequence.addChild(child);
            }
            questionnaire.addChild(sequence);
        }
    }
}

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
  _addQuestionnaire: function () {
    PoguesActions.showNewQuestionnaire(this.state);
    this.setState({
      value: ''
    });
  },
  _hack: function(event) {
    var _questionnaire = new QuestionnaireModel();
    fakeQuestionnaire(_questionnaire);
    console.log(_questionnaire);
    _questionnaire.name = this.state.name;
    _questionnaire.label = this.state.label;
    request
        .post(Config.baseURL + Config.stromaePath)
        .set('Content-Type', 'text/html')
        .send(JSON.stringify(_questionnaire))
        .end(function(err, res) {
            if (err) return;
            if (res.ok) {
                console.log('DataUtils.getQuestionnaire will return questionnaire', 'fake');
            } else {
                console.log(res.body);
            }
        });
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
            Hack
        </button>
        <h3>{additionalControls}</h3>
      </div>
    );
  }
});

module.exports = QuestionnaireEditor;