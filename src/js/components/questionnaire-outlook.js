var React = require('react');
var QuestionnaireStore = require('../stores/questionnaire-store');

function getStateFromStore() {
  console.log('QuestionnaireOutlook getting state from store');
  return {
    questionnaire: QuestionnaireStore.getQuestionnaire()
  }
}
/**
 * Generate nested lists for the questionnaire-outlook
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
    console.log('QuestionnaireOutlook rendering with state', this.state);
    return (
      <div className="col-md-3">
        <nav ref="affix" className="outlook bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top">
          {recursiveOutlook(this.state.questionnaire.children, true)}
        </nav>
      </div>
    )
  }
});

module.exports = QuestionnaireOutlook;
