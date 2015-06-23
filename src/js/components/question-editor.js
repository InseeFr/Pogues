var React = require('react');
var DatatypePicker = require('./DatatypePicker');
var QuestionModel = require('../models/Question');
var ResponseModel = require('../models/Response');
var datatypes = require('../models/model-constants').DatatypeModel.DATA_TYPES;
var locale = require('../stores/dictionary-store').getDictionary();
var ResponseEditor = require('./response-editor');
var assign = require('object-assign');
var Logger = require('../logger/Logger');
var DatatypeEditor = require('./DatatypeEditor');

var logger = new Logger('QuestionEditor', 'Components');

var QuestionEditor = React.createClass({

  propTypes: {
    question: React.PropTypes.instanceOf(QuestionModel)
  },

  componentWillMount: function() {
    var question = this.props.question;
    logger.debug('Props question first response datatype typeName ', question.responses[0].datatype.typeName);
    this.setState({
      name: question.name,
      label: question.label,
      responses: question.responses
    });
  },
  _save: function() {
    // TODO
  },

  _addResponse: function() {
    var question = this.props.question;
    question.addResponse(new ResponseModel())
    this.setState({
      responses: question.responses
    })
  },

  render: function() {
    var question = this.props.question
    // FIXME wrong response removed (check Response model code)
    logger.debug('Current datatypeType is ', this.state.datatypeType);

    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">{locale.responsesEdition}</h3>
          <button
            onClick={this._addResponse}
            className="btn btn-sm btn-primary pull-right">
            {locale.addResponse}</button>
        </div>
        <div className="panel-body">
            {
              this.props.question.responses.map(function (response) {
                return (
                    <ResponseEditor
                      response={response}
                      remove={question.removeResponse.bind(question, response)}/>
                  )
              }, this)
            }
        </div>
      </div>
    );
  }

});

module.exports = QuestionEditor;