import React, { PropTypes } from 'react';
import QuestionnaireEditor from '../components/questionnaire-editor';
import QuestionnaireList from '../components/questionnaire-list';

export default function QuestionnairePicker({ locale }) {
  return (
      <div className="container bs-docs-container">
        <div className="col-md-12">
          <div>
            <h1 className="page-header">{locale.create_questionnaire}</h1>
            <QuestionnaireEditor/>
          </div>
          <div>
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
