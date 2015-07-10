var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');
var QuestionnaireOutlook = require('./questionnaire-outlook');
var Component = require('../components/component');
var GenericInput = require('../components/generic-input');
var classNames = require('classnames');
var locale = require('../stores/dictionary-store').getDictionary();


function getStateFromStore() {
  console.log('Questionnaire getting state from store');
  return {
    questionnaire: QuestionnaireStore.getQuestionnaire(),
    filter       : QuestionnaireStore.getFilter()
  }
}

var Questionnaire = React.createClass({

  _onChange: function() {
    this.setState(getStateFromStore());
  },
  getInitialState: function() {
    return getStateFromStore();
  },
  componentDidMount: function() {
    QuestionnaireStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    QuestionnaireStore.removeChangeListener(this._onChange);
  },
  render: function() {
    console.log('Questionnaire rendering with state', this.state);
    var invite = locale.introduction,
      filter = this.state.filter;

    if (this.state.questionnaire === null) return (
      <div>
        <span className="fa fa-exclamation-triangle fa-3"></span>
        <span className="error-message">{locale.errorMessageQuest}</span>
      </div>
    );
    else if (this.state.questionnaire === undefined) return (
      <div>
        <span className="fa fa-spinner fa-pulse fa-2x"></span>
      </div>
    );
    if (this.state.questionnaire.children.length > 0) invite = '';
    return (
      <div className="container bs-docs-container">
        <div className="row">
          <div className="col-md-9">
            <h1>{invite}</h1>
            {this.state.questionnaire.children.map(function(sequence, index) {
                var classes = classNames({
                  'row': true,
                  'highlight': filter ? filter.test(sequence.name) : false
                });
              return (<Component className={classes} highlightHandler={filter} key={index} component={sequence}/>)
            })}
            <GenericInput />
          </div>
          <div className="col-md-3">
            <QuestionnaireOutlook/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Questionnaire;
