var React = require('react');
var DatatypeModel = require('../models/Datatype');
var locale = require('../stores/dictionary-store').getDictionary();

var TextDatatypeEditor = React.createClass({
  //pattern and maxLength
  propTypes: {
    datatype: React.PropTypes.instanceOf(DatatypeModel)
  },

  componentWillMount: function() {
    var datatype = this.props.datatype;
    this.setState({
      maxLength: datatype.maxLength,
      pattern: datatype.pattern
    });
  },
  _handleMaxLengthChange: function(event) {
    // FIXME don't change model in views
    // with this approach other component won't be informed of any changement
    var maxLength = event.target.value;
    this.props.datatype.maxLength = maxLength;
    // Since we're modifying the model directly, we don't really need to handle
    // the state. But in the long run, that's the way we'll handle changes, so
    // we used it.
    this.setState({
      maxLength: maxLength
    });
  },
  _handlePatternChange: function(event) {
    var pattern = event.target.value;
    this.props.datatype.pattern = pattern;
    this.setState({
      pattern: pattern
    });
  },
  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="length" className="col-sm-2 control-label">{locale.maxLength}</label>
          <div className="col-sm-10">
            <input value={this.state.maxLength} type="number" className="form-control" id="length"
               placeholder={locale.maxLength}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="pattern" className="col-sm-2 control-label">{locale.pattern}</label>
          <div className="col-sm-10">
            <input type="text" value={this.state.pattern} className="form-control" id="pattern"
               placeholder={locale.pattern}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TextDatatypeEditor;