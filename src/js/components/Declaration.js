var React = require('react');
var DeclarationModel = require('../models/Declaration');
var locale = require('../stores/dictionary-store').getDictionary();

var Declaration = React.createClass({
  propTypes: {
    declaration: React.PropTypes.instanceOf(DeclarationModel)
  },

  componentWillMount: function() {
    this.setState({
      text: this.props.declaration.text
    });
  },

  _handleChange: function(event) {
    this.setState({
      text: event.target.value
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
      <div className="form-group">
          <div className="input-group">
            <input value={this.props.declaration.text} onChange={this._handleChange}
              onBlur={this._save}
              type="text" className="form-control" placeholder={locale.instruction}/>
            <span className="input-group-btn">
              <button onClick={this._delete} className="btn btn-default" type="button">&times;</button>
            </span>
        </div>
      </div>
  )}

});

module.exports = Declaration;