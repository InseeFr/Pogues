import React from 'react';
import Component from '../components/component';
import CodeListModel from '../models/code-list';
import classNames from 'classnames';


var CodeList = React.createClass({

  propTypes: {
    codeList : React.PropTypes.instanceOf(CodeListModel)
  },

  getInitialState: function() {
    return {};
  },


  render: function() {
    var classes = classNames({
    });
    return (
      <div>
      </div>
    );
  }
});

module.exports = CodeList;


