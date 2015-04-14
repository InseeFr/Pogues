var React = require('react');

var QuestionnaireTitle =  React.createClass({
  propTypes : {
    title: React.PropTypes.string
  },

  _handleClick: function() {
    
  },

  render: function() {
    return (
      <p className="navbar-text" onClick={this._handleClick}>{this.props.title}</p>
    );
  }
});

module.exports = QuestionnaireTitle;
