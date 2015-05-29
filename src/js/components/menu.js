var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var PoguesActions = require('../actions/pogues-actions');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var QuestionnaireStore = require('../stores/questionnaire-store');
var AppStateStore = require('../stores/appstate-store');
var QuestionnaireTitle = require('./questionnaire-title.js');
var Logger = require('../logger/Logger');

var logger = new Logger('Menu', 'Components');

function getStateFromStore() {
  return AppStateStore.getView();
}

/*
UI component encapsulating the saving questionnaire feature.
*/
class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.saveFunction = props.saveFunction;
    this.buttonLabel = props.buttonLabel;
  }

  render() {
    return(
      <div className="nav navbar-nav navbar-left">
        <form className="navbar-form navbar-right">
          <button className="btn btn-primary" onClick={this.saveFunction}>{this.buttonLabel}</button>
        </form>
      </div>
    );
  }
}

SaveButton.propTypes = {
  saveFunction: React.PropTypes.func,
  buttonLabel: React.PropTypes.string
};

/*
UI component encapsulating the publishing of a questionnaire.
*/
class PublishButton extends React.Component {
  constructor(props) {
    super(props);
    this.publishFunction = props.publishFunction;
    this.buttonLabel = props.buttonLabel;
  }

  render() {
    return(
      <div className="nav navbar-nav navbar-left">
        <form className="navbar-form navbar-right">
          <button className="btn btn-primary" disabled="disabled" onClick={this.publishFunction}>{this.buttonLabel}</button>
        </form>
      </div>
    );
  }
}

PublishButton.propTypes = {
  publishFunction: React.PropTypes.func,
  buttonLabel: React.PropTypes.string
};

/*
Menu Component, share between all views.
*/
var Menu = React.createClass({

  propTypes : {
    handleFilter : React.PropTypes.func,
    title : React.PropTypes.string,
    view : React.PropTypes.string
  },

  getInitialState: function() {
    return {
      filter: ''
    }
  },
  _goHome: function(event) {
    PoguesActions.switchToPicker();
    event.preventDefault();
  },
  _filter: function(event) {
    var filter = event.target.value;
    this.setState({
      filter: filter
    })
    this.props.handleFilter(filter);
  },
  _clickToSave: function(event) {
    logger.info('Clicking on the save button');
    PoguesActions.saveQuestionnaire(QuestionnaireStore.getQuestionnaire());
    event.preventDefault();
  },
  _clickToPublish: function(event) {
    console.log('Click on publish questionnaire button');
    PoguesActions.publishQuestionnaire(QuestionnaireStore.getQuestionnaire());
    event.preventDefault();
  },
  _clickToEditSettings: function(event) {
    PoguesActions.switchToSettings();
    event.preventDefault();
  },

  render: function() {
    logger.info('Rendering the menu with view : ' + this.props.view);
    // TODO: handle connected user properly
    var isQuestionnaireView = this.props.view === ViewTypes.QUESTIONNAIRE;
    var settingsButton = (
      <li className="navbar-form">
        <button className="btn btn-default" onClick={this._clickToEditSettings}>
          <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </button>
      </li>
      );

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
            </button>
            <a href="#" className="navbar-brand" onClick={this._goHome}>Pogues</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {isQuestionnaireView ? <QuestionnaireTitle /> : <span className="navbar-text">{locale.tagline}</span>}

            <div className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input
                  type="text" className="form-control" placeholder={locale.search}
                  value={this.state.filter} onChange={this._filter}/>
              </div>
            </div>

            {isQuestionnaireView ? <SaveButton saveFunction={this._clickToSave} buttonLabel={locale.save}/> : null}
            {isQuestionnaireView ? <PublishButton publishFunction={this._clickToPublish} buttonLabel={locale.publish} /> : null}

            <ul className="nav navbar-nav navbar-right">
              {isQuestionnaireView ? null : settingsButton}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                Me, myself and i
                <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">Disconnect</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Menu;
