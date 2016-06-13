import React from 'react';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import DatatypeModel from '../models/datatype';
import classNames from 'classnames';
import Logger from '../logger/logger';

var logger = new Logger('DataTypePicker', 'Components');

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
    logger.debug('Change in the picker with value', event.target.value);
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

export default DataTypePicker;
