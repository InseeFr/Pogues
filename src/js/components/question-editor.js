import React from 'react';
import DatatypePicker from './datatype-picker';
import QuestionModel from '../models/question';
import ResponseModel from '../models/response';
import {DatatypeModel}  from '../models/model-constants';
var datatypes = DatatypeModel.DATA_TYPES;
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import ResponseEditor from './response-editor';
import assign from 'object-assign';
import Logger from '../logger/logger';
import DatatypeEditor from './datatype-editor';

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
