import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import Dictionary from 'utils/dictionary/dictionary';

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
const VisualizeDropdown = props => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

	useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  /**
   * Will toggle the dropdown menu
   */
  const openDropDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  /**
   * Will open the questionnaire in a specific format, thanks to the type
   * parameter. Will also close the dropdown menu
   */
  const visualize = (event, type) => {
    event.preventDefault();
    props.visualizeActiveQuestionnaire(type, props.componentId);
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const classDropDown = classSet({
    'btn-group': true,
    open: dropdownOpen,
  });
  const classDropDownTrigger = classSet({
    btn: true,
    'dropdown-toggle': true,
    'btn-yellow': true,
    disabled: props.disabled,
  });
  const classDropDownList = classSet({
    top: props.top,
    'dropdown-menu': true,
  });
  return (
    <div className={classDropDown} ref={wrapperRef}>
      <button
        className={classDropDownTrigger}
        disabled={props.disabled}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={e => openDropDown(e)}
      >
        {Dictionary.visualise}
        <span className="caret" />
      </button>
      <ul className={classDropDownList}>
        <li>
          <a href="#" onClick={e => visualize(e, 'html')}>
            {' '}
            {Dictionary.VISUALIZE_WEB}{' '}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => visualize(e, 'stromae-v2')}>
            {' '}
            {Dictionary.VISUALIZE_WEB_STROMAE_V2}{' '}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => visualize(e, 'pdf')}>
            {Dictionary.VISUALIZE_PDF}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => visualize(e, 'queen')}>
            {' '}
            {Dictionary.VISUALIZE_QUEEN}{' '}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => visualize(e, 'spec')}>
            {Dictionary.VISUALIZE_SPECIFICATION}
          </a>
        </li>
        <li>
          <a href="#" onClick={e => visualize(e, 'ddi')}>
            {Dictionary.VISUALIZE_DDI}
          </a>
        </li>
      </ul>
    </div>
  );
}

// PropTypes and defaultProps

VisualizeDropdown.propTypes = {
  visualizeActiveQuestionnaire: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  top: PropTypes.bool.isRequired,
  componentId: PropTypes.string,
};
VisualizeDropdown.defaultProps = {
  visualizeActiveQuestionnaire: undefined,
  disabled: false,
  top: false,
  componentId: '',
};

export default VisualizeDropdown;
