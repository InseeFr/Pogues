var React = require('react');
var GoToModel = require('../models/GoTo');
var locale = require('../stores/dictionary-store').getDictionary();

var GoTo = React.createClass({
  propTypes: {
    goTo: React.PropTypes.instanceOf(GoToModel)
  },

  componentWillMount: function() {
    var goTo = this.props.goTo;
    this.setState({
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
    return (
      // description / expression / ifTrue / ifFalse
      <div className="form-horizontal">
        <div className="form-group">
          <label for="description" class="col-sm-4 control-label">Description</label>
          <div className="col-sm-8">
            <div className="input-group">
              <input value={this.state.text} onChange={this._handleTextChange}
                onBlur={this._save}
                type="text" className="form-control" placeholder={locale.goTo}/>
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

module.exports = GoTo;