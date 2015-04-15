var React = require('react');

var Question = React.createClass({

  render: function() {

    return(
      <div>
        <h4 className="question-header">{this.props.question.name}</h4>
      </div>
    );
  }
});

module.exports = Question;
