import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

function QuestionnaireErrors({
  setSelectedComponentId,
  errorsByComponent,
  components,
}) {
  const [expanded, setExpanded] = useState([]);

  function handleExpand(e, key) {
    e.preventDefault();
    if (expanded.indexOf(key) < 0) {
      setExpanded([...expanded, key]);
    } else {
      setExpanded(expanded.filter(k => k !== key));
    }
  }

  function handleSelect(e, key) {
    e.preventDefault();
    if (components[key].type !== QUESTIONNAIRE) {
      setSelectedComponentId(key);
    }
  }

  const listErrors = Object.keys(errorsByComponent)
    .filter(id => components[id])
    .map(id => {
      const expanded = expanded.indexOf(id) >= 0;
      const invalidComponent = errorsByComponent[id];
      const component = `[${components[id].name}] ${components[id].label}`;
      const errors = invalidComponent.errors.map((e, index) => {
        const message = e.params.dictionary
          ? e.params.dictionary
          : Dictionary[e.dictionary];
        return <li key={`${e.code}-${index}`}>{message}</li>;
      });

      return (
        <li key={id}>
          <a href={`#errors-${id}`} onClick={e => handleExpand(e, id)}>
            {expanded ? (
              <i className="fa fa-minus-square-o" />
            ) : (
              <i className="fa fa-plus-square-o" />
            )}
          </a>
          <a href={`#${id}`} onClick={e => handleSelect(e, id)}>
            {component}
          </a>
          {expanded && <ul>{errors}</ul>}
        </li>
      );
    });

  return <ul>{listErrors}</ul>;
}

QuestionnaireErrors.propTypes = {
  errorsByComponent: PropTypes.object.isRequired,
  components: PropTypes.object,
  setSelectedComponentId: PropTypes.func.isRequired,
};

QuestionnaireErrors.defaultProps = {
  components: {},
};

export default QuestionnaireErrors;
