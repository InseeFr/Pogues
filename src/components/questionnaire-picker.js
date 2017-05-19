import React, { PropTypes } from 'react';
import QuestionnaireEditor from '../components/questionnaire-editor';
import QuestionnaireImport from '../components/questionnaire-import';
import QuestionnaireList from '../components/questionnaire-list';


export default function QuestionnairePicker({ locale }) {
  return (
      <div className="container bs-docs-container">
        <div className="col-md-12">
          <div className="functions">
            <div id="col1">
            <h1 className="page-header">{locale.createQuestionnaire}</h1>
            <QuestionnaireEditor/>
            </div>
            <div id="col2">
            <h1 className="page-header">{locale.import_questionnaire}</h1>
            <QuestionnaireImport/>
            </div>
          </div>
          <div className="results" >
            <h1 className="page-header">{locale.select_questionnaire}</h1>
            <QuestionnaireList/>
          </div>
        </div>
    </div>
  )
}

QuestionnairePicker.propTypes = {
  locale: PropTypes.object.isRequired
}
