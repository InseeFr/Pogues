var React = require('react');
var NumericDatatypeModel = require('../models/numeric-datatype')
var locale = require('../stores/dictionary-store').getDictionary();
var Logger = require('../logger/logger');
var assign = require('object-assign')
var logger = new Logger('NumericDatatypeEditor', 'Components');

// TODO things like this.state._minimum are ugly, but with this
// convention, we can benefit from the very covenient constructors
// form object literals. maybe we should 
var NumericDatatypeEditor = React.createClass({
  //pattern and maxLength
  propTypes: {
    datatype: React.PropTypes.instanceOf(NumericDatatypeModel),
    change: React.PropTypes.func
  },

  componentWillMount: function() {
    var datatype = this.props.datatype;
    this.setState({
      _minimum: datatype.minimum,
      _maximum: datatype.maximum,
      _decimals: datatype.decimals
    });
  },

  _newDatatype: function(chgmt) {
    var datatypeLiteral = assign(this.state, chgmt)
    var datatype = new NumericDatatypeModel(this.state)
    this.setState(chgmt)
    this.props.change(datatype)
    return datatype
  },

  _handleMinimumChange: function(event) {
    var minimum = parseInt(event.target.value);
    var datatype = this._newDatatype({
      _minimum: minimum
    })
  },

  _handleMaximumChange: function(event) {
    var maximum = parseInt(event.target.value);
    this.setState({
      _maximum: maximum
    })
    var datatype = this._newDatatype()
  },

  _handleDecimalsChange: function(event) {
    var decimals = parseInt(event.target.value);
    this.setState({
      _decimals: decimals
    })
    var datatype = this._newDatatype()
   },

  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="minimum" className="col-sm-2 control-label">{locale.minimum}</label>
          <div className="col-sm-10">
            <input value={this.state._minimum} onChange={this._handleMinimumChange}
               type="number" className="form-control" id="length"
               placeholder={locale.minimum}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="maximum" className="col-sm-2 control-label">{locale.maximum}</label>
          <div className="col-sm-10">
            <input value={this.state._maximum} onChange={this._handleMaximumChange}
               type="number" className="form-control" id="length"
               placeholder={locale.maximum}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="decimals" className="col-sm-2 control-label">{locale.decimals}</label>
          <div className="col-sm-10">
            <input value={this.state._decimals} onChange={this._handleDecimalsChange}
               type="number" className="form-control" id="length"
               placeholder={locale.decimals}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = NumericDatatypeEditor;