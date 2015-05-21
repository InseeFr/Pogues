var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var PoguesActions = require('../actions/pogues-actions');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var QuestionnaireStore = require('../stores/questionnaire-store');
var AppStateStore = require('../stores/appstate-store');
var QuestionnaireTitle = require('./questionnaire-title.js');

function getStateFromStore() {
  return AppStateStore.getView();
}

var Menu = React.createClass({

  propTypes : {
    handleFilter : React.PropTypes.func,
    title : React.PropTypes.string,
    view : React.PropTypes.string
  },

  getInitialState: function() {
    return {
      view: getStateFromStore(),
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
    // Mock Questionnaire FIXME
    console.log('Click on save questionnaire button');
    console.dir(QuestionnaireStore.getQuestionnaire());
    PoguesActions.saveQuestionnaire(QuestionnaireStore.getQuestionnaire());
    event.preventDefault();
  },
  _clickToPublish: function(event) {
    console.log('Click on publish questionnaire button');
    PoguesActions.publishQuestionnaire(QuestionnaireStore.getQuestionnaire());
    event.preventDefault();
  },

  render: function() {
    // TODO: handle connected user properly
    var isQuestionnaireView = this.props.view === ViewTypes.QUESTIONNAIRE;
    var saveButton = null;
    var publishButton = null;
    var title = null;
    if(isQuestionnaireView) {
      saveButton = (
        <div className="nav navbar-nav navbar-left">
        <form className="navbar-form navbar-right">
        <button className="btn btn-primary" onClick={this._clickToSave}>{locale.save}</button>
        </form>
        </div>
      );
      publishButton = (
        <div className="nav navbar-nav navbar-left">
        <form className="navbar-form navbar-right">
        <button className="btn btn-primary" disabled="disabled" onClick={this._clickToPublish}>{locale.publish}</button>
        </form>
        </div>
      );
      title = (<QuestionnaireTitle />);
    } else {
      title = <span className="navbar-text">{locale.tagline}</span>;
    }

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
            {title}
            <div className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input
                  type="text" className="form-control" placeholder={locale.search}
                  value={this.state.filter} onChange={this._filter}/>
              </div>
            </div>
            {saveButton}
            {publishButton}
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Me, myself and I <span className="caret"></span></a>
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
