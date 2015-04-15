var React = require('react');

var Question = React.createClass({

  getInitialState: function() {
    return {active: this.props.active};
  },

  render: function() {
    console.log('Question rendering with state', this.state);
    return(
      <div>
        <h4 className="question-header">{this.props.question.name}</h4>
      </div>
    );
  }
});

module.exports = Question;
