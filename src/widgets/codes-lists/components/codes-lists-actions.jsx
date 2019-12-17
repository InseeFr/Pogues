import React from 'react';
import PropTypes from 'prop-types';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { ACTIONS } from '../constants';

const { ACTIONS_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

const propTypes = {
  disabledActions: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    duplicate: PropTypes.func.isRequired,
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  disabledActions: [],
};

// Component

function CodesListsActions({ disabledActions, actions }) {
  return (
    <div className={ACTIONS_CLASS}>
      {Object.keys(ACTIONS).map(key => {
        return (
          <button
            key={key}
            type="button"
            onClick={actions[ACTIONS[key].name]}
            disabled={disabledActions.indexOf(ACTIONS[key].name) !== -1}
          >
            <span className="sr-only">
              {' '}
              {Dictionary[ACTIONS[key].dictionary]}
            </span>
            <span className={`glyphicon ${ACTIONS[key].icon}`} />
          </button>
        );
      })}
    </div>
  );
}

CodesListsActions.propTypes = propTypes;
CodesListsActions.defaultProps = defaultProps;

export default CodesListsActions;
