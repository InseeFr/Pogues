import React from 'react';
import CodeListModel from '../models/code-list';

var CodeList = React.createClass({

  propTypes: {
    codeList : React.PropTypes.instanceOf(CodeListModel)
  },

  getInitialState: function() {
    return {};
  },


  render: function() {
    return (
      <div>
      </div>
    );
  }
});

module.exports = CodeList;


