import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import { Link } from 'react-router-dom';

import Dictionary from '../../../utils/dictionary/dictionary';

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
function ExternalQuestionnaireDropdown({ questionnaireId, disabled, top }) {
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

  const linksQuestionnaire = [
    {
      actionType: 'tcmRef',
      actionLabel: Dictionary.tcmReference,
      page: 'tcm-composition',
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
    <div
      className={ClassSet({
        'btn-group': true,
        dropup: top,
        'flex-column': !top,
        'flex-column-reverse': top,
        open: dropdownOpen,
      })}
      ref={wrapperRef}
    >
      <button
        className={ClassSet({
          btn: true,
          'dropdown-toggle': true,
          'btn-yellow': false,
          'btn-white': true,
          disabled: disabled,
        })}
        disabled={disabled}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={e => openDropDown(e)}
      >
        {Dictionary.externalElement}
        <span className="caret" />
      </button>

      <ul className="dropdown-menu">
        {linksQuestionnaire.map(link => {
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

ExternalQuestionnaireDropdown.propTypes = {
  questionnaireId: PropTypes.string,
  disabled: PropTypes.bool,
  top: PropTypes.bool.isRequired,
};

ExternalQuestionnaireDropdown.defaultProps = {
  disabled: false,
  questionnaireId: undefined,
};

export default ExternalQuestionnaireDropdown;
