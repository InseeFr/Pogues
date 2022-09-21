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
function VisualizeDropdown(props) {
  const {
    questionnaireId,
    componentId,
    token,
    disabled,
    top,
    visualizeActiveQuestionnaire,
    typeDropDown,
    questMergeAction,
  } = props;

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
    setDropdownOpen(!dropdownOpen);
  };

  const classDropDown = classSet({
    'btn-group': true,
    open: dropdownOpen,
  });
  const classDropDownTrigger = classSet({
    btn: true,
    'dropdown-toggle': true,
    'btn-yellow': true,
    disabled: disabled,
  });
  const classDropDownTriggerQuestionnaire = classSet({
    btn: true,
    'dropdown-toggle': true,
    'btn-white': true,
    disabled: disabled,
  });
  const classDropDownList = classSet({
    top: top,
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
    { actionType: 'tcmRef', actionLabel: Dictionary.tcmReference },
    { actionType: 'questRef', actionLabel: Dictionary.questionnaireReference },
    { actionType: 'questMerge', actionLabel: Dictionary.questionnaireMerge },
  ];
  return (
    <div className={classDropDown} ref={wrapperRef}>
      {typeDropDown === 'VISUALIZATION' ? (
        <button
          className={classDropDownTrigger}
          disabled={disabled}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={e => openDropDown(e)}
        >
          {Dictionary.visualise}
          <span className="caret" />
        </button>
      ) : (
        <button
          className={classDropDownTriggerQuestionnaire}
          disabled={disabled}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={e => openDropDown(e)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.externalElement}
        </button>
      )}
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
                  {link.actionType === 'questMerge' ? (
                    <a href="#" onClick={() => questMergeAction()}>
                      {link.actionLabel}
                    </a>
                  ) : (
                    <Link to={`/questionnaire/${questionnaireId}/composition`}>
                      {link.actionLabel}
                    </Link>
                  )}
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
  questMergeAction: PropTypes.func,
};
VisualizeDropdown.defaultProps = {
  visualizeActiveQuestionnaire: undefined,
  disabled: false,
  top: false,
  componentId: '',
  questMergeAction: undefined,
};

export default VisualizeDropdown;
