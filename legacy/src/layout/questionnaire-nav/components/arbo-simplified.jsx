import { useState } from 'react';

import PropTypes from 'prop-types';

import {
  getSortedChildren,
  isFilter,
  isLoop,
  isNestedFilter,
  isQuestion,
} from '../../../utils/component/component-utils';

function ArboSimplified({ setSelectedComponentId, components, questionnaire }) {
  const [expanded, setExpanded] = useState([]);

  function handleExpand(e, key) {
    e.preventDefault();
    if (expanded.indexOf(key) < 0) setExpanded([...expanded, key]);
    else setExpanded(expanded.filter((k) => k !== key));
  }

  function handleClick(e, key) {
    e.preventDefault();
    setSelectedComponentId(key);
  }

  function renderComponentsByParent(components, parent) {
    return getSortedChildren(components, parent).map((key) => {
      if (key === 'idendquest') return null;

      const subTree = renderComponentsByParent(components, key);
      if (
        isLoop(components[key]) ||
        isFilter(components[key]) ||
        isNestedFilter(components[key])
      )
        return null;

      return (
        <li
          key={key}
          className={isQuestion(components[key]) ? 'questions' : ''}
        >
          {components[key].children && components[key].children.length > 0 && (
            <button
              onClick={(e) => handleExpand(e, key)}
              className={`glyphicon ${
                expanded.indexOf(key) >= 0
                  ? 'glyphicon-menu-down'
                  : 'glyphicon-menu-right'
              }`}
            />
          )}
          <button onClick={(e) => handleClick(e, key)}>
            {components[key].name.toUpperCase()}
          </button>
          {expanded.indexOf(key) >= 0 && (
            <ul className="arbo-simplifield">{subTree}</ul>
          )}
        </li>
      );
    }, {});
  }

  return (
    <ul className="arbo-simplifield">
      {renderComponentsByParent(components, questionnaire.id)}
    </ul>
  );
}

ArboSimplified.propTypes = {
  components: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
};

export default ArboSimplified;
