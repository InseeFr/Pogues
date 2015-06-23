var React = require('react');
var TextDatatypeModel = require('../models/text-datatype');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign');
var Logger = require('../logger/Logger');

var logger = new Logger('', '');

var TextDatatypeEditor = React.createClass({
  //pattern and maxLength
  propTypes: {
    datatype: React.PropTypes.instanceOf(TextDatatypeModel),
    change: React.PropTypes.func
  },

  componentWillMount: function() {
    var datatype = this.props.datatype;
    this.setState({
      _maxLength: datatype.maxLength,
      _pattern: datatype.pattern,
      _visualizationHint: datatype.visualizationHint
    });
  },

  _newDatatype: function(chgmt) {
    var datatypeLiteral = assign(this.state, chgmt);
    var datatype = new TextDatatypeModel(datatypeLiteral);
    this.props.change(datatype)
    return datatype
  },

  _handleMaxLengthChange: function(event) {
    var maxLength = event.target.value;
    var datatype = this._newDatatype({
      _maxLength: maxLength
    })
  },

  _handlePatternChange: function(event) {
    var pattern = event.target.value;
    var datatype = this._newDatatype({
      _pattern: pattern
    })
  },

  _handleVisualizationHintChange: function(event) {
    var vizHint = event.target.value;
    this._newDatatype({
      _visualizationHint: vizHint
    });
  },

  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="length" className="col-sm-2 control-label">{locale.maxLength}</label>
          <div className="col-sm-10">
            <input value={this.state._maxLength} type="number"
                   className="form-control" id="length"
                   placeholder={locale.maxLength}
                   onChange={this._handleMaxLengthChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="pattern" className="col-sm-2 control-label">{locale.pattern}</label>
          <div className="col-sm-10">
            <input type="text" value={this.state._pattern} 
                  className="form-control" id="pattern"
                  placeholder={locale.pattern}
                  onChange={this._handlePatternChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="visualizationHint" className="col-sm-2 control-label">{locale.visualizationHint}</label>
          <div className="col-sm-10">
            <select onChange={this._handleVisualizationHintChange} 
                  className="form-control"
                  value={this.state._visualizationHint}>
              {this.props.datatype.vizHintsList.map(hint => <option value={hint}>{hint}</option>)}
            </select>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TextDatatypeEditor;