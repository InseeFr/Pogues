var React = require('react');

var Sequence = React.createClass({

  render: function() {
    //console.log('Sequence rendering with props', this.props);
    var Tag = 'h' + this.props.sequence.depth;
    var sequence = this.props.sequence;

    return(
      <div>
        <Tag className="sequence-header">{sequence.name}</Tag>
        {sequence.children.map(function(child, index) {
          return (<Component highlightHandler={this.props.highlightHandler} component={child}/>);
        }, this)}
      </div>
    );
  }
});

module.exports = Sequence;

var Component = require('../components/component');