var React = require('react');
var ComponentModel = require('../models/Component');
var nameFromLabel = require('../utils/data-utils').nameFromLabel;
var Declaration = require('./Declaration');
var Control = require('./Control');
var GoTo = require('./GoTo');
var DeclarationModel = require('../models/Declaration');
var QuestionEditor = require('./question-editor');
var locale = require('../stores/dictionary-store').getDictionary();

var ComponentEditor = React.createClass({

  propTypes: {
    close: React.PropTypes.func,
    component: React.PropTypes.instanceOf(ComponentModel)
  },

  getInitialState: function() {
    return {
      nameEdited: false,
    }
  },
  componentWillMount: function() {
    var component = this.props.component;
    this.setState({
      name: component.name,
      label: component.label,
      declarations: component.declarations,
      controls: component.controls,
      goTos: component.goTos
    });
  },
  _handleNameChange: function(event) {
    this.setState({
      name: event.target.value
    })
  },
  _handleLabelChange: function(event) {
    this.setState({
      label: event.target.value
    })
  },
  _updateDeclarations: function() {
    this.setState({
      declarations: this.props.component.declarations
    });
  },
  // TODO implement
  _addControl: function() {},
  _removeControl: function() {},
  _addGoTo: function() {},
  _removeGoTo: function() {},

  _addDeclaration: function () {
    this.props.component.addDeclaration(new DeclarationModel({_text: 'A funky declaration'}));
    this._updateDeclarations();
  },

  _removeDeclaration: function(dcl) {
    //FIXME not ok with react philosphy
    //I think it's just like modifying the props, not desirable
    this.props.component.removeDeclaration(dcl);
    this._updateDeclarations();
  },

  _save: function () {
    //update component
    //FIXME : Not ok with react philosophy, only a hack
    var component = this.props.component;
    component.name = this.state.name;
    component.label = this.state.label;
    component.declarations = this.state.declarations;
    component.controls = this.state.controls;
    // say questionnaire edidtor we're done
    this.props.close();
  },
  render: function() {
    var component = this.props.component,
        declarations =  this.state.declarations,
        controls = this.state.controls,
        goTos = this.state.goTos,
        declarationsEls,
        controlsEls,
        questionEl,
        goTosEl;

    // TODO DRY
    if (declarations.length > 0) {
      declarationsEls = declarations.map(function (dcl) {
        return <Declaration delete={this._removeDeclaration.bind(this, dcl)}
               key={dcl.id} declaration={dcl}/>;
      }, this);
    } else {
      declarationsEls = <span>No declaration yet</span>;
    }

    if (declarations.length > 0) {
      controlsEls = controls.map(function (ctrl) {
        return <Control delete={this._removeDeclaration.bind(this, ctrl)}
               key={ctrl.id} control={ctrl}/>;
      }, this);
    } else {
      controlsEls = <span>No control yet</span>;
    }

    if (goTos.length > 0) {
      controlsEls = controls.map(function (goTo) {
        return <GoTo delete={this._removeGoTo.bind(this, goTo)}
               key={goTo.id} control={goTo}/>;
      }, this);
    } else {
      controlsEls = <span>No goTo yet</span>;
    }
    // TODO handle distinction between question and sequence in a different manner
    // we're dealing with a question
    if (!component.depth) {
      questionEl = <QuestionEditor question={component}/>;
    }

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="label" className="control-label sr-only">{locale.label}</label>
          <div className="col-sm-8">
            <input value={this.state.label} onChange={this._handleLabelChange}
                type="text" className="form-control" id="label" placeholder={locale.label}/>
          </div>
          <label htmlFor="name" className="control-label sr-only">{locale.name}</label>
          <div className="col-sm-3">
            <input value={this.state.name} onChange={this._handleNameChange}
               type="text" className="form-control" id="name" placeholder={locale.name}/>
          </div>
            <div className="col-sm-1">
              <button onClick={this._save} className="btn btn-default">&times;</button>
            </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">{locale.declarations}</h3>
            <button onClick={this._addDeclaration} className="btn btn-sm btn-primary pull-right">{locale.addDeclaration}</button>
          </div>
          <div className="panel-body">
            <div className="form">{declarationsEls}</div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">{locale.controls}</h3>
            <button onClick={this._addControl} className="btn btn-sm btn-primary pull-right">{locale.addControl}</button>
          </div>
          <div className="panel-body">
            {controlsEls}
          </div>
        </div>
        {questionEl}
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">{locale.goTo}</h3>
            <button onClick={this._addGoTo} className="btn btn-sm btn-primary pull-right">{locale.defineGoTo}</button>
          </div>
          <div className="panel-body">
            {goTosEl}
          </div>
        </div>
    </div>
    );
  }
})

module.exports = ComponentEditor;