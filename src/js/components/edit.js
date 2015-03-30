/** @jsx React.DOM */
var React = require('react');

var Edit = React.createClass({
  // props : attached component id

  render: function() {
    return(
      <div className="col-md-2 edit"> EDIT
        <span className="fa fa-pencil fa-2x"></span>
      </div>
    );
  }
});

module.exports = Edit;
