var React = require('react');
var QuestionnaireEditor = require('../components/questionnaire-editor');
var QuestionnaireList = require('../components/questionnaire-list');
var inviteNew = {'en': 'Create a new questionnaire', 'fr': 'Créer un nouveau questionnaire'};
var locale = require('../stores/dictionary-store').getDictionary();

var QuestionnairePicker = React.createClass({

  render: function() {
    return (
        <div className="container bs-docs-container">
          <div className="col-md-6">
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

module.exports = QuestionnairePicker;