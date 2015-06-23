var React = require('react');
var GoToModel = require('../models/go-to');
var locale = require('../stores/dictionary-store').getDictionary();
var ComponentModel = require('../models/component')
var QuestionnaireModel = require('../models/questionnaire')
var Target = require('./target')


var GoTo = React.createClass({
  propTypes: {
    goTo: React.PropTypes.instanceOf(GoToModel).isRequired,
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired,
    delete: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    var goTo = this.props.goTo;
    return {
      description: goTo.description,
      expression: goTo.expression,
      ifTrue: goTo.ifTrue,
      ifFalse: goTo.ifFalse
    }
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
  _handleIfTrueChange: function(target) {
    this.setState({
      ifTrue: target
    })
  },
  _handleIfFalseChange: function(target) {
    this.setState({
      ifFalse: target
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
      <div>
        <datalist id="candidates">
           {this.props.candidates.map(function (cmpnt) {
             return <option key={cmpnt.id} value={cmpnt.name}/>;
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
          <Target
            text={locale.ifTrue}
            handleChange={this._handleIfTrueChange}
            initialTarget={this.state.ifTrue}
            candidates={this.props.candidates}/>
          <Target
            text={locale.ifFalse}
            handleChange={this._handleIfFalseChange}
            initialTarget={this.state.ifFalse}
            candidates={this.props.candidates}/>
        </div>
      </div>
  )}

});

module.exports = GoTo;