import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import ClassSet from 'react-classset';
import {
  getValueWithSuggestion,
  /* getPattern, */
} from 'forms/controls/control-with-suggestions/components/utils';

import {
  /* updateSuggestions, */
  initialize,
  /* getNewIndex, */
} from './input-with-suggestions-utils';
import { HighLighter } from 'widgets/highlighter';
import { getKey } from 'utils/widget-utils';

import { CONTROL_WITH_SUGGESTIONS } from 'constants/dom-constants';

const { COMPONENT_CLASS, LIST_CLASS, ITEM_CLASS, ITEM_SELECTED_CLASS } =
  CONTROL_WITH_SUGGESTIONS;

// PropTypes and defaultProps

export const propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  required: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  disabled: PropTypes.bool,
  numSuggestionsShown: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  availableSuggestions: PropTypes.arrayOf(PropTypes.string),
  focusOnInit: PropTypes.bool,
};

export const defaultProps = {
  required: false,
  disabled: false,
  numSuggestionsShown: 10,
  availableSuggestions: [],
  focusOnInit: false,
};

// Component

function ControlWithSuggestions(props) {
  const InputRegex = /\$(\w+)\b(?!\s)/;

  const [state, setState] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  /* const [input, setInput] = useState(props.input); */

  useEffect(() => {
    setState(initialize());
    // input
    if (props.focusOnInit) props.input.focus();
  }, [props.focusOnInit, props.input]);

  /* const Modal = React.memo(
    props => {...},
    (prevProps, nextProps) => nextProps.input.value === prevProps.input.value &&
    nextProps.meta.error === prevProps.meta.error &&
    nextState.hoveredSuggestionIndex === prevProps.hoveredSuggestionIndex &&
    nextProps.focusedInput === prevProps.focusedInput
  ); */

  /*   shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.error !== this.props.meta.error ||
      nextState.hoveredSuggestionIndex !== this.state.hoveredSuggestionIndex ||
      nextProps.focusedInput !== this.props.focusedInput
    );
  }
 */

  useEffect(() => {
    if (activeItem) activeItem.scrollIntoView(false);
  }, [activeItem]);

  // OnChange of the input
  /* const handleInputChange = value => {
    // props
    setState(
      updateSuggestions(
        getPattern(value, props.input.selectionStart),
        InputRegex,
        props.availableSuggestions,
      ),
    );

    // Execute default code afterwards
    props.input.onChange(value);
  }; */

  // OnClick of an item
  const handleSuggestionClick = suggestion => {
    // props
    const newValue = getValueWithSuggestion(
      suggestion,
      props.input.selectionStart,
      props.input.value,
    );
    // props
    const restfullText = props.input.value.substr(
      props.input.selectionStart,
      props.input.value.length,
    );
    props.input.onChange(`${newValue} ${restfullText}`);
    setState(initialize());
  };

  // OnKeyDown of the input
  /* const handleInputKeyDown = e => {
    if (e.key === 'Tab') {
      handleTab(e);
    } else if (e.key === 'Enter') {
      handleEnter(e);
    }
  }; */

  /* const handleTab = e => {
    const { suggestions, hoveredSuggestionIndex } = state;

    if (suggestions.length > 0) {
      setState({
        hoveredSuggestionIndex: getNewIndex(
          hoveredSuggestionIndex,
          suggestions,
          props.numSuggestionsShown,
        ),
      });
      e.preventDefault();
    }
  };

  const handleEnter = e => {
    const { suggestions, hoveredSuggestionIndex } = state;

    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[hoveredSuggestionIndex]);
      e.preventDefault();
    }
  }; */

  // OnFocus of the input
  /* const handleInputFocus = () => {
    setState({ ...state, hoveredSuggestionIndex: 0 });
  }; */

  const { input, numSuggestionsShown, focusedInput } = props;
  const { suggestions, hoveredSuggestionIndex } = state;
  const matches = input.value.match(InputRegex);
  const highlight = matches ? matches[1] : '';

  return (
    focusedInput === input.name && (
      <div className={COMPONENT_CLASS}>
        {suggestions.length > 0 && (
          <div className={LIST_CLASS}>
            {suggestions.slice(0, numSuggestionsShown).map(
              (
                suggest,
                index, // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              ) => (
                <div
                  key={getKey(suggest)}
                  onClick={() => {
                    handleSuggestionClick(suggest);
                  }}
                  role="button"
                  tabIndex={0}
                  className={ClassSet({
                    [ITEM_CLASS]: true,
                    [ITEM_SELECTED_CLASS]: index === hoveredSuggestionIndex,
                  })}
                  title={suggest}
                  ref={node => {
                    if (index === hoveredSuggestionIndex) setActiveItem(node);
                  }}
                >
                  <HighLighter highlight={highlight} caseSensitive={false}>
                    {suggest}
                  </HighLighter>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    )
  );
}

ControlWithSuggestions.propTypes = propTypes;

ControlWithSuggestions.defaultProps = defaultProps;

export default ControlWithSuggestions;
