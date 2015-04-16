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
  componentWillMount: function() {
    var question = this.props.question;
    this.setState({
      name: question.name,
      label: question.label,
      datatypeType: question.response.datatype.typeName,
      datatype: question.response.datatype
    });
  },
  _save: function() {
    // TODO 
  },

  _handleDatatypeTypeChange: function(datatypeType) {
    // change question datatype
    this.setState({
      datatypeType: datatypeType,
    })
  },
  _handleDatatatTypePropertiesChange: function(datatypeProps){
    // TODO ugly, think again about model constructors
    var type = {_type: this.state.datatypeType};
    this.setState({
      datatype: new datatypeToModel(assign(type, datatypeProps))
    });
  },


  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">{locale.questionEdition}</h3>
          <div className="pull-right">
            <DatatypePicker datatypeType={this.state.datatypeType} handleChange={this._handleDatatypeTypeChange}/>
          </div>
        </div>
        <div className="panel-body">
          {datatypeToComponent[this.state.datatypeType].call()}
        </div>
      </div>
    );
  }

});

module.exports = QuestionEditor;