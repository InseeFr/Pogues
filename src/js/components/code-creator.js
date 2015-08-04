var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var PoguesConstants = require('../constants/pogues-constants')

var CodeCreator = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
  },

  componentWillMount: function() {
    this.setState({
      _value: '',
      _label: ''
    })
  },

  _change: function (event) {
    this.setState({
      _label: event.target.value
    })
  },


  _handleKeyDown: function (event) {
    if (event.keyCode === PoguesConstants.General.ENTER_KEY_CODE) {
      if (!this.state._label) return;
      this.props.add(this.state)
      this.setState({
        _value: '',
        _label: ''
      })
    }
  },

  render: function() {
    return (
      <div className="form-group code">
        <label htmlFor="label" className="col-sm-3 control-label">
          {locale.newCode}
        </label>
        <div className="col-sm-9">
          <input
            id="label"
            value={this.state._label}
            className="form-control"
            placeholder={locale.typeNewCode}
            onChange={this._change}
            onKeyDown={this._handleKeyDown} />
        </div>
      </div>
    );
  }

});

module.exports = CodeCreator;
