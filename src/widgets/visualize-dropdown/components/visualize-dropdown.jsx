import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Dictionary from 'utils/dictionary/dictionary';
import { hasDuplicateVariables } from 'utils/variables/variables-utils';

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
function VisualizeDropdown({
  componentId,
  token,
  disabled,
  top,
  visualizeActiveQuestionnaire,
  externalVariables,
  calculatedVariables,
  collectedVariableByQuestion,
  questionnaire,
  externalQuestionnairesVariables,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [
    hasQuestionnaireDuplicateVariables,
    setHasQuestionnaireDuplicateVariables,
  ] = useState(undefined);
  const [allowDuplicateVariablesModal, setAllowDuplicateVariablesModal] =
    useState(false);
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
    setHasQuestionnaireDuplicateVariables(
      hasDuplicateVariables(
        externalVariables,
        calculatedVariables,
        collectedVariableByQuestion,
        questionnaire,
        externalQuestionnairesVariables,
      ),
    );
    setAllowDuplicateVariablesModal(true);
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

  const handleCloseModal = () => setAllowDuplicateVariablesModal(false);

  const links = [
    { actionType: 'html', actionLabel: Dictionary.VISUALIZE_WEB },
    {
      actionType: 'stromae-v2',
      actionLabel: Dictionary.VISUALIZE_WEB_STROMAE_V2,
    },
    { actionType: 'queen-capi', actionLabel: Dictionary.VISUALIZE_QUEEN_CAPI },
    { actionType: 'queen-cati', actionLabel: Dictionary.VISUALIZE_QUEEN_CATI },
    { actionType: 'pdf', actionLabel: Dictionary.VISUALIZE_PDF },
    { actionType: 'spec', actionLabel: Dictionary.VISUALIZE_SPECIFICATION },
    { actionType: 'ddi', actionLabel: Dictionary.VISUALIZE_DDI },
  ];
  return (
    <div
      className={classSet({
        'btn-group': true,
        dropup: top,
        'flex-column': !top,
        'flex-column-reverse': top,
        open: dropdownOpen,
      })}
      ref={wrapperRef}
    >
      <button
        id="visualize"
        className={classSet({
          btn: true,
          'dropdown-toggle': true,
          'btn-yellow': true,
          'btn-white': false,
          disabled: disabled,
        })}
        disabled={disabled}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={e => openDropDown(e)}
      >
        {Dictionary.visualise}
        <span className="caret" />
      </button>
      {!(
        allowDuplicateVariablesModal && hasQuestionnaireDuplicateVariables
      ) && (
        <ul className="dropdown-menu">
          {links.map(link => {
            return (
              <li key={link.actionLabel}>
                <a href="#" onClick={e => visualize(e, link.actionType)}>
                  {link.actionLabel}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <ReactModal
        isOpen={
          allowDuplicateVariablesModal && hasQuestionnaireDuplicateVariables
        }
        className="custom-modal"
        ariaHideApp={false}
      >
        <p>{Dictionary.duplicateVariablesComment}</p>
        <Link to={`/questionnaire/${questionnaire?.id}/duplicate-variables`}>
          <button className="modal-button">
            {Dictionary.showErrorDuplicateVariables}
          </button>
        </Link>
        <button className="modal-button" onClick={handleCloseModal}>
          {Dictionary.close}
        </button>
      </ReactModal>
    </div>
  );
}

// PropTypes and defaultProps

VisualizeDropdown.propTypes = {
  visualizeActiveQuestionnaire: PropTypes.func,
  disabled: PropTypes.bool,
  top: PropTypes.bool,
  componentId: PropTypes.string,
  externalVariables: PropTypes.object,
  calculatedVariables: PropTypes.object,
  collectedVariableByQuestion: PropTypes.object,
  questionnaire: PropTypes.object,
  externalQuestionnairesVariables: PropTypes.object,
  token: PropTypes.string,
};
VisualizeDropdown.defaultProps = {
  visualizeActiveQuestionnaire: undefined,
  disabled: false,
  top: false,
  componentId: '',
  externalVariables: {},
  calculatedVariables: {},
  collectedVariableByQuestion: {},
  questionnaire: {},
  externalQuestionnairesVariables: {},
  token: undefined,
};

export default VisualizeDropdown;
