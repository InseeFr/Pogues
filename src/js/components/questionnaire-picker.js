var React = require('react');
var QuestionnaireEditor = require('../components/questionnaire-editor');
var QuestionnaireList = require('../components/questionnaire-list');
var inviteNew = {'en': 'Create a new questionnaire', 'fr': 'Créer un nouveau questionnaire'};

var QuestionnairePicker = React.createClass({

	render: function() {
		return (
			<div>
				<div className="container bs-docs-container">
					<div className="form-group">
						<h1>{inviteNew[this.props.language]}</h1>
						<QuestionnaireEditor language={this.props.language}/>
					</div>
					<QuestionnaireList language={this.props.language}/>
				</div>
			</div>
		)
	}
});

module.exports = QuestionnairePicker;