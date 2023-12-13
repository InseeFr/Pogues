import React from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';

import { WIDGET_SEARCH_RESULTS } from '../../../constants/dom-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const {
  COMPONENT_CLASS,
  HEADER_CLASS,
  COLUMN_CLASS,
  ROW_CLASS,
  ROW_EMPTY_CLASS,
  COLUMN_ACTIONS_CLASS,
} = WIDGET_SEARCH_RESULTS;

// Utils

function renderRowValues(values) {
  return values.map(
    (
      v,
      index, // eslint-disable-next-line react/no-array-index-key
    ) => (
      <div key={index} className={COLUMN_CLASS}>
        {v}
      </div>
    ),
  );
}

function renderRowActions(actions, values) {
  return (
    <div className={`${COLUMN_CLASS} ${COLUMN_ACTIONS_CLASS}`}>
      {actions.map((a, index) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={event => {
            event.preventDefault();
            a.action(values);
          }}
        >
          {a.icon && <span className={`glyphicon ${a.icon}`} />}
          <span
            className={ClassSet({
              'sr-only': a.iconOnly,
            })}
          >
            {Dictionary[a.dictionary]}
          </span>
        </button>
      ))}
    </div>
  );
}

// PropTypes and defaultProps

const propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dictionary: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      dictionary: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
  noValuesMessage: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  id: undefined,
  className: undefined,
  values: [],
};

// Component

function SearchResults({
  id,
  className,
  columns,
  actions,
  noValuesMessage,
  values,
}) {
  // Obtaining the traductions for the different columns and the actions column.
  const headerValues = [
    ...columns.map(c => Dictionary[c.dictionary]),
    Dictionary.searchResultAction,
  ];
  const props = {
    className: `${COMPONENT_CLASS} ${COMPONENT_CLASS}-${columns.length + 1}`,
  };

  if (id) props.id = id;
  if (className) props.className = `${props.className} ${className}`;

  return (
    <div {...props}>
      {/* Header */}
      <div className={`${ROW_CLASS} ${HEADER_CLASS}`}>
        {renderRowValues(headerValues)}
      </div>

      {/* No values row message */}
      {values.length === 0 && (
        <div className={`${ROW_CLASS} ${ROW_EMPTY_CLASS}`}>
          {noValuesMessage}
        </div>
      )}

      {/* Rows */}
      {values.map((v, index) => {
        const rowValues = columns.map(c => v[c.key]);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={ROW_CLASS}>
            {renderRowValues(rowValues)}
            {renderRowActions(actions)}
          </div>
        );
      })}
    </div>
  );
}

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default SearchResults;
