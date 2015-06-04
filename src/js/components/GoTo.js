var React = require('react');
var GoToModel = require('../models/GoTo');
var locale = require('../stores/dictionary-store').getDictionary();
var ComponentModel = require('../models/Component')
var QuestionnaireModel = require('../models/Questionnaire')
var ComponentPicker = require('./ComponentPicker')


var GoTo = React.createClass({
  propTypes: {
    goTo: React.PropTypes.instanceOf(GoToModel).isRequired,
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired,
    delete: React.PropTypes.func.isRequired
  },

  componentWillMount: function() {
    var goTo = this.props.goTo;
    this.setState({
      description: "",
      expression: "",
      ifTrue: "",
      ifFalse: ""
    });
  },
  getInitialState: function() {
    return {}
  },
  _handleExpressionChange: function(event) {
    this.setState({
      expression: null
    })
  },
  _handleDescriptionChange: function(event) {
    this.setState({
      description: null
    })
  },
  _handleIfTrueChange: function(value) {
    this.setState({
      ifTrue: value
    });
  },
  _handleIfFalseChange: function(value) {
    this.setState({
      ifFalse: value
    });
  },
  _handleTypeChange: function(event) {
    this.setState({
      type: event.target.value
    });
  },
  _handleDisjoignableChange: function(event) {
    this.setState({
      disjoignable: event.target.value
    });
  },
  _save: function(event) {
    // FIXME not ok with react philosphy
    this.props.declaration.text = this.state.text;
  },

  _delete: function() {
    // FIXME not ok with react philosphy
    this.props.delete();
  },

  render: function() {
    return (
      // description / expression / ifTrue / ifFalse
     <div>
        <datalist id="candidates">
           {this.props.candidates.map(function (cmpnt) {
             return <option value={cmpnt.name + ' - ' + cmpnt.id}/>;
           }, this)}
       </datalist>
       <div className="form-horizontal">
         <div className="form-group">
           <div className="col-sm-12">
             <input type="text" placeholder={locale.description}
                    className="form-control"/>
           </div>
         </div>
         <div className="form-group">
           <div className="col-sm-12">
             <input type="text" placeholder={locale.expression}
                    className="form-control"/>
             </div>
         </div>
         <div className="form-group">
           <label className="col-sm-4 control-label">{locale.ifTrue}</label>
           <div className="col-sm-8">
             <ComponentPicker initialValue={this.state.ifTrue} candidates={this.props.candidates}
               handleChange={this._handleIfTrueChange}/>
           </div>
         </div>
         <div className="form-group">
           <label className="col-sm-4 control-label">{locale.ifFalse}</label>
           <div className="col-sm-8">
             <ComponentPicker initialValue={this.state.ifTrue} candidates={this.props.candidates}
               handleChange={this._handleIfTrueChange}/>
           </div>
         </div>
       </div>
     </div>
  )}

});

module.exports = GoTo;