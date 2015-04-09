var React = require('react');
var PoguesActions = require('../actions/pogues-actions');

var EditActivator = React.createClass({
  // TODO props : attached component id

  _handleClick : function() {
    var id = this.props.componentId
    console.log('attached component key is : ' + id);
    PoguesActions.editComponent(id);
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
