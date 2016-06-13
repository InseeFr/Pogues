import React from 'react';
import PoguesConstants from '../constants/pogues-constants';
import PoguesActions from '../actions/pogues-actions';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import DataUtils from '../utils/data-utils';
// start of hack
import DataXMLUtils from '../utils/data-xml-utils';
import request from 'superagent';
import Config from '../config/config';
import QuestionnaireModel from '../models/questionnaire'
import QuestionModel from '../models/question'
import SequenceModel from '../models/sequence'
import {nameFromLabel} from '../utils/name-utils';
import {rName} from '../utils/name-utils';
// end of hack
import Logger from '../logger/logger';

var logger = new Logger('QuestionnaireEditor', 'Components');

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
        this.inputName.focus();
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
    //PoguesActions.createQuestionnaireLocal(this.state.name, this.state.label);
    var questionnaire =  new QuestionnaireModel();
    questionnaire.label = this.state.label;
    questionnaire.name = this.state.name;
    logger.debug('Creating questionnaire: ', questionnaire);
    PoguesActions.createQuestionnaire(questionnaire);
    // go to questionnaire view
    // FIXME ROM1704 suppress when refacto is finished
    //PoguesActions.switchToQuestionnaire();
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
    _xmlHack: function(event) {
      var fakeQ = new QuestionnaireModel();
      DataUtils.populateFakeQuestionnaire(fakeQ);
      var xmlQuestionnaire = DataXMLUtils.questionnaireToXMLString(fakeQ);
      logger.debug('Questionnaire converted to XML: ', xmlQuestionnaire);
      event.preventDefault();
    },
    render: function() {
        var additionalControls = '';
        if (this.state.active) additionalControls = 'More controls here';
        return (
          <div>
            <div className="form-group">
                <label htmlFor="name">{locale.name}</label>
                <input className="form-control"
                  type="text" value={this.state.name}
                  ref={ref => this.inputName = ref}
                  placeholder={locale.phName} onChange={this._handleNameChange}
                  onKeyPress={this._disableNameGeneration}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">{locale.label}</label>
              <input className="form-control"
                type="text" value={this.state.label}
                placeholder={locale.phLabel} onChange={this._handleLabelChange}/>
            </div>
            <button className="btn btn-primary" type="button"
                onClick={this._addQuestionnaire}>
                {locale.create}
            </button>
            <h3>{additionalControls}</h3>
      </div>
      );
}
});

export default QuestionnaireEditor;
