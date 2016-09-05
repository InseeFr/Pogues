import React, { PropTypes } from 'react'
import RichControl from './rich-control'
import _ from 'lodash'

/** 
 * Group of buttons to control a draft-js Editor
 *
 * We need to pass it `className` because extra `<div>` break bootstrap
 * css selectors.
 */
export default function RichControlGroup({ 
  className, controlActions, controlStates, locale }) {
  return (
    <div className={className}>
      {
        _.map(controlActions, (toggle, id) => 
          <RichControl key={id} 
            identifier={id}
            toggle={toggle}
            isSet={controlStates[id]} />)
      }
    </div>
  )
}

RichControlGroup.propTypes = {
  controlActions: PropTypes.object.isRequired,
  controlStates: PropTypes.object.isRequired,
  className: PropTypes.string,
  locale: PropTypes.object.isRequired
}

