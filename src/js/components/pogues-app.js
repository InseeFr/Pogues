import React, { PropTypes } from 'react';
import { VIEW_TYPE } from '../constants/pogues-constants';
import QuestionnairePicker from '../components/questionnaire-picker';
import QuestionnaireContainer from '../components/questionnaire-container';
import ConfigEditor from '../components/config-editor';
import Menu from './menu.js';
import Logger from '../logger/logger';

import { connect } from 'react-redux'

var logger = new Logger('PoguesApp', 'Components');

const { QUESTIONNAIRE, PICKER, CONFIG } = VIEW_TYPE

function PoguesApp({ view, locale }) {
  //TODO user react-router instead
  logger.info('Rendering Pogues main UI with view : ', view);
  let child, title, filter;
  switch (view) {
    case PICKER:
      child = <QuestionnairePicker locale={locale} />;
      title = locale.tagline;
      break;
    case QUESTIONNAIRE:
      title = '';
      logger.debug('Calling Questionnaire component');
      child = <QuestionnaireContainer />;
      break;
    case CONFIG:
      child = <ConfigEditor locale={locale} />;
      //TODO internationalize
      title= 'Config editor';
      break;
  }

  return (
    <div>
      <Menu handleFilter={filter} title={title} view={view}/>
      {child}
    </div>
  )
}

PoguesApp.propTypes = {
  view: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  view: state.appState.view,
  locale: state.locale
})

export default connect(mapStateToProps)(PoguesApp)
