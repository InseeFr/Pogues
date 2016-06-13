import React from 'react';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import PoguesActions from '../actions/pogues-actions';
import {ViewTypes} from '../constants/pogues-constants';
import QuestionnaireStore from '../stores/questionnaire-store';;
import AppStateStore from '../stores/appstate-store';;
import QuestionnaireTitle from './questionnaire-title.js';
import _ from 'lodash';
import Logger from '../logger/logger';

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
          <button className="btn btn-primary" onClick={this.publishFunction}>{this.buttonLabel}</button>
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
Link of the published questionnaire
*/
class PublishLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="nav navbar-nav navbar-left">
        <form className="navbar-form navbar-right">
            <a href={this.props.publishURL} target="_blank">Visualisez !  </a>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
          <small>[ {this.props.publishTimestamp} ]</small>
        </form>
      </div>
    );
  }
}

PublishLink.propTypes = {
  publishURL : React.PropTypes.string,
  publishTimestamp : React.PropTypes.string
};

/*
SearchField
*/
class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filter : ''};
    //this.filterFunction = props.filterFunction;
    this.filterLabel = props.filterLabel;
  }
  handleChange(filterFunction, event) {
    logger.info('Handling change with value : ' + event.target.value);
    this.setState({
      filter:event.target.value
      });
    // Using props to ensure we have the latest function passed throught props
    filterFunction(event.target.value);
  }
  render() {
    return(
      <div className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input
            type="text" className="form-control" placeholder={this.filterLabel}
            value={this.state.filter} onChange={this.handleChange.bind(this, this.props.filterFunction)}/>
        </div>
      </div>
    );
  }
}

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
      filter: '',
      url: '',
      timestamp: null
    }
  },
  componentDidMount: function() {
    // TODO display publication URL
    logger.debug('Component did mount, adding change listener.');
    QuestionnaireStore.addChangeListener(this._onQStoreChange);
  },
  componentDidUpdate: function() {
    logger.debug('Component did update, state is ', this.state);
  },
  _onQStoreChange: function() {
    logger.info('Handling change, state is : ', this.state);
    this.setState({
      url: QuestionnaireStore.getPublicationURL(),
      timestamp : QuestionnaireStore.getPublicationTimestamp()
    });
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
    logger.info('Click on publish questionnaire button');
    PoguesActions.publishQuestionnaire(QuestionnaireStore.getQuestionnaire());
    event.preventDefault();
  },
  _clickToEditConfig: function(event) {
    PoguesActions.switchToConfig();
    event.preventDefault();
  },

  render: function() {
    logger.info('Rendering the menu for the view : ' + this.props.view);
    // TODO: handle connected user properly
    var isQuestionnaireView = this.props.view === ViewTypes.QUESTIONNAIRE;
    var configButton = (
      <li className="navbar-form">
        <button className="btn btn-default" onClick={this._clickToEditConfig}>
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
            <a href="#" className="navbar-brand" onClick={this._goHome}><span className="pogues-logo font-effect-shadow-multiple">pogues</span></a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {isQuestionnaireView ? <QuestionnaireTitle /> : <span className="navbar-text">{locale.tagline}</span>}

            <SearchField filterFunction={this.props.handleFilter} filterLabel={locale.search}/>

            {isQuestionnaireView ? <SaveButton saveFunction={this._clickToSave} buttonLabel={locale.save}/> : null}

            {isQuestionnaireView ? <PublishButton publishFunction={this._clickToPublish} buttonLabel={locale.publish} /> : null}

            {this.state.url !== '' ? <PublishLink publishURL={this.state.url} publishTimestamp={this.state.timestamp}/>  : ''}

            <ul className="nav navbar-nav navbar-right">
              {isQuestionnaireView ? null : configButton}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                {_.shuffle(['Thomas','JB','Franck','Eric','François','Will','Jérémie','Guillaume','Romain','Roaming Lena Monster']).pop()}
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

export default Menu;
