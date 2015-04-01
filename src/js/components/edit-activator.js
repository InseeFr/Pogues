/** @jsx React.DOM */
var React = require('react');

var EditActivator = React.createClass({
  // TODO props : attached component id

  _handleClick : function() {
    // TODO send ActivateAction
    console.log('attached component key is : ' + this.props.componentId);
  },

  render: function() {
    var visibility = this.props.componentOver ? 'visible' : 'invisible',
        klass = 'col-md-2 ' + visibility;
    return(
      <div className={klass}> EDIT
        <span className="fa fa-pencil fa-2x" onClick={this._handleClick}></span>
      </div>
    );
  }
});

module.exports = EditActivator;
