var React = require('react');
var ViewTypes = require('../constants/pogues-constants').ViewTypes;
var QuestionnaireListStore = require('../stores/questionnaire-list-store');
var AppStateStore = require('../stores/appstate-store');
var QuestionnairePicker = require('../components/questionnaire-picker');
var Questionnaire = require('../components/questionnaire');
var PoguesActions = require('../actions/pogues-actions');
var ComponentEditor = require('../components/component-editor');
var ConfigEditor = require('../components/config-editor');
var Menu = require('./menu.js');
var ConfigStore = require('../stores/config-store');
var locale = require('../stores/dictionary-store');
var QuestionnaireUtils = require('../utils/questionnaire-utils');
var QuestionnaireStore = require('../stores/questionnaire-store');
var Logger = require('../logger/logger');

var logger = new Logger('PoguesApp', 'Components');

function getStateFromStore(){
  var state = AppStateStore.getState();
  state.config = ConfigStore.getConfig();
  return state;
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
    ConfigStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
    ConfigStore.removeChangeListener(this._onChange);
  },
  render: function() {
    logger.info('Rendering Pogues main UI with view : ', this.state.view);
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
      logger.debug('Calling Questionnaire component');
      child =
        <Questionnaire/>
    } else if (this.state.view === ViewTypes.EDITION) {
      // HACK this view should be embeded in the questionnaire view
      filter = null;// TODO desactivate search in menu bar for this state
      // FIXME Title should be internationalized
      title = 'Édition d`un composant';
      logger.debug('Editing component ', this.state.idComponent);
      // FIXME shouldn't call questionnaire store
      var questionnaire = QuestionnaireStore.getQuestionnaire();
      var candidates = QuestionnaireUtils.after(questionnaire, component);
      var component = QuestionnaireUtils.getComponentFromId(questionnaire, this.state.componentId);
      child = <ComponentEditor component={component} candidates={candidates}/>;
    } else if (this.state.view === ViewTypes.CONFIG) {
      child = <ConfigEditor/>
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
