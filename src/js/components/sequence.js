var React = require('react');
var SequenceModel = require('../models/sequence')

var Sequence = React.createClass({
  propTypes: {
    sequence: React.PropTypes.instanceOf(SequenceModel)
  },

  render: function() {
    var Tag = 'h' + this.props.sequence.depth;
    var sequence = this.props.sequence;

    return(
      <div>
        <Tag className="sequence-header">{sequence.label}</Tag>
        {sequence.children.map(function(child, index) {
          return (<Component key={child.id} highlightHandler={this.props.highlightHandler}
             component={child}/>);
        }, this)}
      </div>
    );
  }
});

module.exports = Sequence;

var Component = require('../components/component');