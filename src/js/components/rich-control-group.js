import React, { PropTypes } from 'react'
import RichControl from './rich-control'
import _ from 'lodash'

/** 
 * Group of buttons to control a draft-js Editor
 *
 * We need to pass it `className` because extra `<div>` break bootstrap
 * css selectors.
 */
export default function RichControlGroup({ className, controls, locale }) {
  return (
    <div className={className}>
      {
        _.map(controls, ({ toggle, isSet }, id) => 
          <RichControl key={id} 
            identifier={id}
            toggle={toggle}
            isSet={isSet} />)
      }
    </div>
  )
}

RichControlGroup.propTypes = {
  controls: PropTypes.object.isRequired,
  className: PropTypes.string,
  locale: PropTypes.object.isRequired
}

{/* <div className="btn-group btn-group-xs">
  { controlList.map((ctrl, i) => <RichControl key={i} {...ctrl} />) }
</div> */}
// //       <div className="col-sm-10">
//         <input type="text" className="form-control input-sm"
//           style={{ border: 'none' }}/>
//       </div>p