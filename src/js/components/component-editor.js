var React = require('react');
var ComponentModel = require('../models/component');
var nameFromLabel = require('../utils/data-utils').nameFromLabel;
var Declaration = require('./declaration');
var Control = require('./control');
var GoTo = require('./go-to');
var DeclarationModel = require('../models/declaration');
var QuestionEditor = require('./question-editor');
var locale = require('../stores/dictionary-store').getDictionary();
var GoToModel = require('../models/go-to');
var QuestionnaireStore = require('../stores/questionnaire-store')
var QuestionnaireUtils = require('../utils/questionnaire-utils')

// TODO Sould we listen to Questionnaire Store ? If the questionnaire
// changes, this component becomes meaningless, but this change would
// be catched at a higher level and this component won't be rendered
// anymore. So it feels weird to listen to
// Questionnaire Store. But the use of QuestionnaireStore.getQuestionnaire
// could tempt us to do so for the sake of consistency.
var ComponentEditor = React.createClass({

  propTypes: {
    close: React.PropTypes.func,
    component: React.PropTypes.instanceOf(ComponentModel)
  },

  getInitialState: function() {
    return {
      questionnaire: QuestionnaireStore.getQuestionnaire(),
      nameEdited: false
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
  // HACK because we manipulate props
  _update: function() {
    this.setState({
      declarations: this.props.component.declarations,
      goTos: this.props.component.goTos,
      controls: this.props.component.controls
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
  _addGoTo: function() {
    this.props.component.addGoTo(new GoToModel({_description: 'My funky goTo'}));
    this._update();
  },
  _removeGoTo: function(goTo) {
    this.props.component.removeGoTo(goTo);
    this._update();
  },

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
        questionnaire = this.state.questionnaire,
        declarations =  this.state.declarations,
        controls = this.state.controls,
        goTos = this.state.goTos,
        declarationsEls,
        controlsEls,
        questionEl,
        goTosEls;

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
    // FIXME duplicate entries in candidates
    // TODO make after a method of QuestionnaireStore to avoid
    // multiple flattening of the same questionnaire
    var candidates = QuestionnaireUtils.after(questionnaire, component)
    if (goTos.length > 0) {
      goTosEls = goTos.map(function (goTo) {
        return <GoTo candidates={candidates} delete={this._removeGoTo.bind(this, goTo)}
               key={goTo.id} goTo={goTo}/>;
      }, this);
    } else {
      goTosEls = <span>No goTo yet</span>;
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
          <div className="col-sm-7">
            <input value={this.state.label} onChange={this._handleLabelChange}
                type="text" className="form-control" id="label" placeholder={locale.label}/>
          </div>
          <label htmlFor="name" className="control-label sr-only">{locale.name}</label>
          <div className="col-sm-3">
            <input value={this.state.name} onChange={this._handleNameChange}
               type="text" className="form-control" id="name" placeholder={locale.name}/>
          </div>
            <div className="col-sm-2">
              <button onClick={this._save} className="btn btn-default pull-right">
                <span className="glyphicon glyphicon-ok"/>
              </button>
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
            {goTosEls}
          </div>
        </div>
    </div>
    );
  }
})

module.exports = ComponentEditor;