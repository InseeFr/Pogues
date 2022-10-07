import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';
import { Link } from 'react-router-dom';

import Dictionary from 'utils/dictionary/dictionary';

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
function VisualizeDropdown({
  questionnaireId,
  componentId,
  token,
  disabled,
  top,
  visualizeActiveQuestionnaire,
  typeDropDown,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback(event => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  /**
   * Will toggle the dropdown menu
   */
  const openDropDown = e => {
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
    visualizeActiveQuestionnaire(type, componentId, token);
    setDropdownOpen(false);
  };

  const classDropDown = classSet({
    'btn-group': true,
    dropup: top,
    'flex-column': !top,
    'flex-column-reverse': top,
    open: dropdownOpen,
  });
  const classDropDownTrigger = classSet({
    btn: true,
    'dropdown-toggle': true,
    'btn-yellow': typeDropDown === 'VISUALIZATION',
    'btn-white': typeDropDown !== 'VISUALIZATION',
    disabled: disabled,
  });
  const classDropDownList = classSet({
    'dropdown-menu': true,
  });
  const links = [
    { actionType: 'html', actionLabel: Dictionary.VISUALIZE_WEB },
    {
      actionType: 'stromae-v2',
      actionLabel: Dictionary.VISUALIZE_WEB_STROMAE_V2,
    },
    { actionType: 'pdf', actionLabel: Dictionary.VISUALIZE_PDF },
    { actionType: 'queen', actionLabel: Dictionary.VISUALIZE_QUEEN },
    { actionType: 'spec', actionLabel: Dictionary.VISUALIZE_SPECIFICATION },
    { actionType: 'ddi', actionLabel: Dictionary.VISUALIZE_DDI },
  ];
  const linksQuestionnaire = [
    {
      actionType: 'tcmRef',
      actionLabel: Dictionary.tcmReference,
      page: 'composition',
    },
    {
      actionType: 'questRef',
      actionLabel: Dictionary.questionnaireReference,
      page: 'composition',
    },
    {
      actionType: 'questMerge',
      actionLabel: Dictionary.questionnaireMerge,
      page: 'merge',
    },
  ];
  return (
    <div className={classDropDown} ref={wrapperRef}>
      <button
        className={classDropDownTrigger}
        disabled={disabled}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={e => openDropDown(e)}
      >
        {typeDropDown === 'VISUALIZATION' && Dictionary.visualise}
        {typeDropDown !== 'VISUALIZATION' && Dictionary.externalElement}
        <span className="caret" />
      </button>

      <ul className={classDropDownList}>
        {typeDropDown === 'VISUALIZATION'
          ? links.map(link => {
              return (
                <li key={link.actionLabel}>
                  <a href="#" onClick={e => visualize(e, link.actionType)}>
                    {link.actionLabel}
                  </a>
                </li>
              );
            })
          : linksQuestionnaire.map(link => {
              return (
                <li key={link.actionLabel}>
                  <Link to={`/questionnaire/${questionnaireId}/${link.page}`}>
                    {link.actionLabel}
                  </Link>
                </li>
              );
            })}
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
