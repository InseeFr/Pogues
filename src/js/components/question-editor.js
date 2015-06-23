var React = require('react');
var DatatypePicker = require('./DatatypePicker');
var QuestionModel = require('../models/Question');
var datatypes = require('../models/model-constants').DatatypeModel.DATA_TYPES;
var locale = require('../stores/dictionary-store').getDictionary();
var NumericDatatypeEditor = require('./NumericDatatypeEditor');
var TextDatatypeEditor = require('./TextDatatypeEditor');
var DateDatatypeEditor = require('./DateDatatypeEditor');
var NumericDatatypeModel = require('../models/NumericDatatype');
var TextDatatypeModel = require('../models/TextDatatype');
var DateDatatypeModel = require('../models/DateDatatype');
var assign = require('object-assign');
var Logger = require('../logger/Logger');
var DatatypeEditor = require('./DatatypeEditor');

var logger = new Logger('QuestionEditor', 'Components');

//TODO fragile, think about it
//mapping between response types and components
var datatypeToComponent = {
  NUMERIC:  React.createFactory(NumericDatatypeEditor),
  TEXT:  React.createFactory(TextDatatypeEditor),
  DATE:  React.createFactory(DateDatatypeEditor)
};

var datatypeToModel = {
  NUMERIC: NumericDatatypeModel,
  TEXT: TextDatatypeModel,
  DATE: DateDatatypeModel
};


var QuestionEditor = React.createClass({
  // TODO save
  propTypes: {
    question: React.PropTypes.instanceOf(QuestionModel)
  },
  // FIXME process only the first response model for now
  componentWillMount: function() {
    var question = this.props.question;
    logger.debug('Props question first response datatype typeName ', question.responses[0].datatype.typeName);
    this.setState({
      name: question.name,
      label: question.label,
      datatypeType: question.responses[0].datatype.typeName,
      datatype: question.responses[0].datatype
    });
  },
  _save: function() {
    // TODO 
  },

  _handleDatatypeTypeChange: function(datatypeType) {
    // change question datatype
    // ensure that the new datatypeType is different before changing the model
    if (datatypeType === this.state.datatypeType) return;
    // changing the model
    var newDatatype = new datatypeToModel[datatypeType]();
    this.props.question.responses[0].datatype = newDatatype;
    this.setState({
      datatypeType: datatypeType,
      datatype: newDatatype
    })
  },

  render: function() {
    logger.debug('Current datatypeType is ', this.state.datatypeType);
    var datatypeEditor = datatypeToComponent[this.state.datatypeType]({
          handleChange: this._handleDatatypeChange,
          datatype : this.state.datatype
        });
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">{locale.questionEdition}</h3>
          <div className="pull-right">
            <DatatypePicker handleChange={this._handleDatatypeTypeChange} 
              datatypeType={this.state.datatypeType}/>
          </div>
        </div>
        <div className="panel-body">
          <DatatypeEditor change={() => 'yo'} datatype="NUMERIC" />
        </div>
      </div>
    );
  }

});

module.exports = QuestionEditor;