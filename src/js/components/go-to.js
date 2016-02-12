var React = require('react');
var GoToModel = require('../models/go-to');
var locale = require('../stores/dictionary-store').getDictionary();
var ExpressionModel = require('../models/expression');
var ComponentModel = require('../models/component')
var QuestionnaireModel = require('../models/questionnaire')
var Target = require('./target')
var Logger = require('../logger/logger');

import PoguesActions from '../actions/pogues-actions'

var logger = new Logger('GoTo', 'Components');

class GoToDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    // The GoTo we want to delete
    this.target = props.target;
    this.delete = props.delete;
  }

  _handleClick() {
    logger.debug(`Target GoTo id ${this.target.id}`);
    this.delete();
  }

  render() {
    return (
      <div>
        <button type="button"
                className="btn btn-danger"
                onClick={this._handleClick.bind(this)}>
                {locale.deleteGoTo}
        </button>
      </div>
    );
  }
}

GoToDeleteButton.propTypes = {
  target: React.PropTypes.instanceOf(GoToModel),
  delete: React.PropTypes.func
};

var GoTo = React.createClass({
  propTypes: {
    goTo: React.PropTypes.instanceOf(GoToModel).isRequired,
    candidates: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(ComponentModel)).isRequired,
    delete: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired
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
    var oldGoTo = this.props.goTo;
    var newGoTo = new GoToModel(oldGoTo);
    newGoTo.expression = event.target.value;
    this.props.update(oldGoTo, newGoTo);
    this.setState({
      expression: null
    })
  },
  _handleDescriptionChange: function(event) {
    var oldGoTo = this.props.goTo;
    var newGoTo = new GoToModel(oldGoTo);
    newGoTo.description = event.target.value;
    this.props.update(oldGoTo, newGoTo);
    this.setState({
      description: null
    })
  },
  _handleIfTrueChange: function(id) {
    var oldGoTo = this.props.goTo;
    var newGoTo = new GoToModel(oldGoTo);
    newGoTo.ifTrue = id;
    this.props.update(oldGoTo, newGoTo);
    this.setState({
      ifTrue: id
    })
  },
  _handleIfFalseChange: function(id) {
    var oldGoTo = this.props.goTo;
    var newGoTo = new GoToModel(oldGoTo);
    newGoTo.ifFalse = id;
    this.props.update(oldGoTo, newGoTo);
    this.setState({
      ifFalse: id
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
    this.props.ifTrue = this.state.ifTrue;
  },

  _delete: function() {
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
              <input type="text"
                     placeholder={locale.description}
                     className="form-control"
                     onChange={this._handleDescriptionChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text"
                     placeholder={locale.expression}
                     className="form-control"
                     value={this.state.expression}
                     onChange={this._handleExpressionChange}/>
            </div>
          </div>
          <Target text={locale.ifTrue}
                  handleChange={this._handleIfTrueChange}
                  initialTarget={this.state.ifTrue}
                  candidates={this.props.candidates}/>
          <Target text={locale.ifFalse}
                  handleChange={this._handleIfFalseChange}
                  initialTarget={this.state.ifFalse}
                  candidates={this.props.candidates}/>
        </div>
        <GoToDeleteButton target={this.props.goTo} delete={this.props.delete}/>
      </div>
  )}

});

module.exports = GoTo;
