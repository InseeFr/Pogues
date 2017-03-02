/* eslint-env jquery */
import React, { Component, PropTypes } from 'react';

/**
 * Generates nested lists for the questionnaire-outlook
 * @param  {Array of components} components A list of components
 * @return {[Array of elements]}
 */
function recursiveOutlook(components, root) {
  if (!components || components.length === 0) return;
  var classname = root ? 'nav bs-docs-sidenav' : 'nav';
  var bullets = components.map(function(child, index) {
    var anchor = '#' + child.id;

    return (
      <li key={index}>
        <a href={anchor}> {child.name}</a>
        {recursiveOutlook(child.childCmpnts)}
      </li>
    ) 
  })
  return (
    <ul className={classname}>
      {bullets}
    </ul>
  );
}

class QuestionnaireOutlook extends Component {

  componentDidMount() {
    $(this.affix).affix({
      offset: { top: 100 }
    })
  }

  render() {
    const { childCmpnts } = this.props
    return (
      <div className="row">
        <nav ref={ref => this.affix = ref} className="outlook bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top">
          {recursiveOutlook(childCmpnts, true)}
        </nav>
      </div>
    )
  }
}

QuestionnaireOutlook.propTypes = {
  childCmpnts: PropTypes.array.isRequired
}

export default QuestionnaireOutlook;