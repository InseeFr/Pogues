var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();
var DatatypeModel = require('../models/datatype');
var classNames = require('classnames');

import { getClassFromDatatype, getDatatypeTypes, createDatatype} from '../utils/datatype-factory'

var DataTypePicker = React.createClass({

  propTypes: {
    edition: React.PropTypes.bool,
    edit: React.PropTypes.func,
    change: React.PropTypes.func,
    datatype: React.PropTypes.instanceOf(DatatypeModel)
  },

  componentWillMount: function() {
    this.setState({
      datatype: this.props.datatype,
    });
  },

  _edit: function() {
    this.props.edit();
  },

  _handleChange: function(event) {
    // TODO keep track of last datatype description for a given datatype type
    var datatype = createDatatype(event.target.value)
    this.setState({
      datatype: datatype
    });
    this.props.change(datatype);
  },

  render: function() {
    var datatypeTypes = getDatatypeTypes();
    var typeChoices =  datatypeTypes.map(function (key) {
          return (
            <option value={key}>
              {locale[key]}
            </option>
            );
        });

    var btnClass = classNames({
      'btn': true,
      'btn-default': !this.props.edition,
      'btn-primary': this.props.edition
    });

    return (
      <div>
        <div className="col-sm-3">
          <select onChange={this._handleChange}
             value={this.state.datatype.typeName} className="form-control">
            {typeChoices}
          </select>
        </div>
      </div>
    );
  }

});

module.exports = DataTypePicker;