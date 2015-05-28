var React = require('react');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var AppStateStore = require('../stores/appstate-store');
var QuestionnairePicker = require('../components/questionnaire-picker');
var Questionnaire = require('../components/questionnaire');
var PoguesActions = require('../actions/pogues-actions');
var ComponentEditor = require('../components/ComponentEditor');
var SettingsEditor = require('../components/SettingsEditor');
var Menu = require('./menu.js');
var config = require('../config/config');
var locale = require('../stores/dictionary-store');
var QuestionnaireUtils = require('../utils/questionnaire-utils');
var QuestionnaireStore = require('../stores/questionnaire-store');
var Logger = require('../logger/Logger');

var logger = new Logger('PoguesApp', 'Components');

function getStateFromStore(){
  return AppStateStore.getState();
}

var PoguesApp = React.createClass({


  getInitialState: function() {
    return getStateFromStore();
  },
  _onChange: function() {
    this.setState(getStateFromStore());
  },
  componentDidMount: function() {
    AppStateStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
  },
  render: function() {
    logger.info('Rendering Pogues main UI');
    logger.debug('ENV : ' + (config.dev ? 'dev' : 'prod'));
    var child,
      title,
      filter;
    if (this.state.view === ViewTypes.PICKER) {
      filter = PoguesActions.filterQuestionnaires;
      child = <QuestionnairePicker setAppState={this._switchQuestionnaireView} language={this.props.language}/>;
      title = locale.tagline;
    }
    else if (this.state.view === ViewTypes.QUESTIONNAIRE) {
      filter = PoguesActions.filterComponents;
      title = '';
      console.log('PoguesApp calling Questionnaire with title', title);
      child =
        <Questionnaire/>
    } else if (this.state.view === ViewTypes.EDITION) {
      // HACK this view should be embeded in the questionnaire view
      filter = null;// TODO desactivate search in menu bar for this state
      title = 'Édition d`un composant';
      console.log('PoguesApp editing component', this.state.idComponent);
      // FIXME shouldn't call questionnaire store
      var questionnaire = QuestionnaireStore.getQuestionnaire();
      var component = QuestionnaireUtils.getComponentFromId(questionnaire, this.state.componentId);
      child = <ComponentEditor component={component}/>;
    } else if (this.state.view === ViewTypes.SETTINGS) {
      child = <SettingsEditor/>
    }
    // FIXME title should be read from Questionnaire Store when
    // we are rendering a questionnaire:
    return (
      <div>
        <Menu handleFilter={filter} title={title} view={this.state.view}/>
        {child}
      </div>)
  }
});

module.exports = PoguesApp;
