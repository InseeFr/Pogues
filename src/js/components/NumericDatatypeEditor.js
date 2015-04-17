var React = require('react');
var DatatypeModel = require('../models/Datatype');
var locale = require('../stores/dictionary-store').getDictionary();

var NumericDatatypeEditor = React.createClass({
  //pattern and maxLength
  propTypes: {
    datatype: React.PropTypes.instanceOf(DatatypeModel)
  },

  componentWillMount: function() {
    var datatype = this.props.datatype;
    this.setState({
      minimum: datatype.minimum,
      maximum: datatype.maximum,
      decimals: datatype.decimals
    });
  },
  _handleMinimumChange: function(event) {
    // FIXME don't change model in views
    // with this approach other component won't be informed of any changement
    var minimum = event.target.value;
    this.props.datatype.minimum = minimum;
    // Since we're modifying the model directly, we don't really need to handle
    // the state. But in the long run, that's the way we'll handle changes, so
    // we used it.
    this.setState({
      minimum: minimum
    });
  },
  _handleMaximumChange: function(event) {
    // FIXME don't change model in views
    // with this approach other component won't be informed of any changement
    var maximum = event.target.value;
    this.props.datatype.maximum = maximum;
    // Since we're modifying the model directly, we don't really need to handle
    // the state. But in the long run, that's the way we'll handle changes, so
    // we used it.
    this.setState({
      maximum: maximum
    });
  },
  _handleDecimalsChange: function(event) {
    // FIXME don't change model in views
    // with this approach other component won't be informed of any changement
    var decimals = event.target.value;
    this.props.datatype.decimals = decimals;
    // Since we're modifying the model directly, we don't really need to handle
    // the state. But in the long run, that's the way we'll handle changes, so
    // we used it.
    this.setState({
      decimals: decimals
    });
  },
  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="minimum" className="col-sm-2 control-label">{locale.minimum}</label>
          <div className="col-sm-10">
            <input value={this.state.minimum} onChange={this._handleMinimumChange}
               type="number" className="form-control" id="length"
               placeholder={locale.minimum}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="maximum" className="col-sm-2 control-label">{locale.maximum}</label>
          <div className="col-sm-10">
            <input value={this.state.maximum} onChange={this._handleMaximumChange}
               type="number" className="form-control" id="length"
               placeholder={locale.maximum}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="decimals" className="col-sm-2 control-label">{locale.decimals}</label>
          <div className="col-sm-10">
            <input value={this.state.decimals} onChange={this._handleDecimalsChange}
               type="number" className="form-control" id="length"
               placeholder={locale.decimals}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = NumericDatatypeEditor;