import React from 'react';
import QuestionnaireEditor from '../components/questionnaire-editor';
import QuestionnaireList from '../components/questionnaire-list';
var inviteNew = {'en': 'Create a new questionnaire', 'fr': 'Créer un nouveau questionnaire'};
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()

var QuestionnairePicker = React.createClass({

  render: function() {
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
});

export default QuestionnairePicker;
