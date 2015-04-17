var React = require('react');
var DeclarationModel = require('../models/Declaration');
var locale = require('../stores/dictionary-store').getDictionary();
var declarationTypes = require('../models/model-constants').DeclarationModel.DECLARATION_TYPES;

var Declaration = React.createClass({
  propTypes: {
    declaration: React.PropTypes.instanceOf(DeclarationModel)
  },

  componentWillMount: function() {
    var declaration = this.props.declaration;
    this.setState({
      text: declaration.text,
      type: declaration.type,
      disjoinable: declaration.disjoinable
    });
  },

  _handleTextChange: function(event) {
    this.setState({
      text: event.target.value
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
    var typeChoices =  declarationTypes.map(function (key) {
          return <option value={key}>{locale[key]}</option>;
        });
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12">
            <div className="input-group">
              <input value={this.state.text} onChange={this._handleTextChange}
                onBlur={this._save}
                type="text" className="form-control" placeholder={locale.instruction}/>
              <span className="input-group-btn">
                <button onClick={this._delete} className="btn btn-default" type="button">&times;</button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6">
            <select onChange={this._handleTypeChange}
               value={this.state.type} className="form-control input-block-level">
              {typeChoices}
            </select>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" value={this.state.disjoinable}/>
                    {locale.disjoignable}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}

});

module.exports = Declaration;