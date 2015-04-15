var React = require('react');
var PoguesActions = require('../actions/pogues-actions');

var EditActivator = React.createClass({

  _handleClick : function() {
    this.props.toggleActive();
  },

  render: function() {
    var visibility = this.props.componentOver ? 'visible' : 'invisible',
        klass = 'col-md-2 ' + visibility;
    return(
      <div className={klass}>
        <span className="fa fa-pencil fa-2x" onClick={this._handleClick}></span>
      </div>
    );
  }
});

module.exports = EditActivator;
