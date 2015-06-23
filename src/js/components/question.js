var React = require('react');

var Question = React.createClass({

  getInitialState: function() {
    return {active: this.props.active};
  },

  render: function() {
    return(
      <div>
        <h4 className="question-header">{this.props.question.label}</h4>
      </div>
    );
  }
});

module.exports = Question;
