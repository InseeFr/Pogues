var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');
var Logger = require('../logger/logger');

var logger = new Logger('QuestionnaireOutlook', 'Components');

function getStateFromStore() {
  logger.debug('Getting state from QuestionnaireStore');
  return {
    questionnaire: QuestionnaireStore.getQuestionnaire()
  }
}

/**
 * Generates nested lists for the questionnaire-outlook
 * @param  {Array of components} components A list of components
 * @return {[Array of elements]}
 */
function recursiveOutlook(components, root) {
  if (!components || components.length === 0) return;
  var classname = root ? "nav bs-docs-sidenav" : "nav";
  var bullets = components.map(function(child, index) {
    var anchor = '#' + child.id;
    var childElements;

    return(
      <li key={index}>
        <a href={anchor}> {child.name}</a>
        {recursiveOutlook(child.children)}
      </li>
    );
  });
  return (
    <ul className={classname}>
      {bullets}
    </ul>
  );
}

var QuestionnaireOutlook = React.createClass({

  _onChange: function() {
    this.setState(getStateFromStore());
  },
  getInitialState: function() {
    return getStateFromStore();
  },
  componentDidMount: function() {
    QuestionnaireStore.addChangeListener(this._onChange);
     $(this.refs.affix.getDOMNode())
      .affix({
        offset: {
          top: 100
      }});
  },
  componentWillUnmount: function() {
    QuestionnaireStore.removeChangeListener(this._onChange);
  },
  render: function() {
    logger.debug('Rendering with state ', this.state);
    return (
      <div className="row">
        <nav ref="affix" className="outlook bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top">
          {recursiveOutlook(this.state.questionnaire.children, true)}
        </nav>
      </div>
    )
  }
});

module.exports = QuestionnaireOutlook;