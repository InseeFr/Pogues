var React = require('react');
var DatatypeModel = require('../models/Datatype');
var locale = require('../stores/dictionary-store').getDictionary();

var TextDatatypeEditor = React.createClass({
  //pattern and maxLength
  propTypes: {
    datatype: React.PropTypes.instanceOf(DatatypeModel)
  },

  componentwillMount: function() {
    var datatype = this.props.datatype;
    this.setState({
      maxLength: datatype.maxLength,
      pattern: datatype.pattern
    });
  },
  _handleMaxLengthChange: function() {
    this.setState({
      maxLength: event.target.value
    });
  },
  _handlePatternChange: function() {
    this.setState({
      pattern: event.target.value
    });
  },
  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="length" className="col-sm-2 control-label">{locale.maxLength}</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="length"
               placeholder={locale.maxLength}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="pattern" className="col-sm-2 control-label">{locale.pattern}</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="pattern"
               placeholder={locale.pattern}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TextDatatypeEditor;