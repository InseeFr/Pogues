var React = require('react');
var DatatypePicker = require('./datatype-picker');
var QuestionModel = require('../models/question');
var ResponseModel = require('../models/response');
var datatypes = require('../models/model-constants').DatatypeModel.DATA_TYPES;
var locale = require('../stores/dictionary-store').getDictionary();
var ResponseEditor = require('./response-editor');
var assign = require('object-assign');
var Logger = require('../logger/logger');
var DatatypeEditor = require('./datatype-editor');

var logger = new Logger('QuestionEditor', 'Components');

var QuestionEditor = React.createClass({

  propTypes: {
    question: React.PropTypes.instanceOf(QuestionModel)
  },

  componentWillMount: function() {
    var question = this.props.question;
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
    var nbResponses = question.responses.length
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
              this.props.question.responses.map(function (response, i) {
                return (
                  <div>
                    <ResponseEditor
                      response={response}
                      remove={question.removeResponse.bind(question, response)}/>
                    { i < nbResponses -1 && <hr/> }
                  </div>
                  )
              }, this)
            }
        </div>
      </div>
    );
  }

});

module.exports = QuestionEditor;
