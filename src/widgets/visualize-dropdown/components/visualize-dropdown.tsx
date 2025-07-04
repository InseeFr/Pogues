import { useRef, useState } from 'react';

import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { VisualizationKind } from '@/api/visualize';
import { domSelectorForModal } from '@/constants/dom-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { useClickAway } from './useClickAway';
import { hasDuplicateVariables } from './utils';

interface VisualizeDropdownProps {
  token?: string;
  componentId?: string;
  isDirtyState?: boolean;
  disabled?: boolean;
  top?: boolean;
  visualizeActiveQuestionnaire: (
    type: VisualizationKind,
    componentId: string,
    token: string,
    isDirtyState?: boolean,
  ) => void;
  externalVariables?: { [key: string]: { name: unknown } };
  calculatedVariables?: { [key: string]: { name: unknown } };
  collectedVariableByQuestion?: {
    [key: string]: { [key: string]: { name: unknown } };
  };
  questionnaire?: { childQuestionnaireRef: unknown[]; id: string };
  externalQuestionnairesVariables?: {
    [key: string]: {
      id: unknown;
      variables: { [key: string]: { Name: unknown } };
    };
  };
}

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
export default function VisualizeDropdown({
  token = '',
  componentId = '',
  disabled = false,
  isDirtyState = false,
  top = false,
  visualizeActiveQuestionnaire,
  externalVariables = {},
  calculatedVariables = {},
  collectedVariableByQuestion = {},
  questionnaire = {
    id: '',
    childQuestionnaireRef: [],
  },
  externalQuestionnairesVariables = {},
}: Readonly<VisualizeDropdownProps>) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [
    hasQuestionnaireDuplicateVariables,
    setHasQuestionnaireDuplicateVariables,
  ] = useState<boolean | undefined>(undefined);
  const [allowDuplicateVariablesModal, setAllowDuplicateVariablesModal] =
    useState<boolean>(false);

  const wrapperRef = useRef(null);

  useClickAway(wrapperRef, () => setDropdownOpen(false));

  /**
   * Will toggle the dropdown menu
   */
  const openDropDown = (e: React.MouseEvent) => {
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
  const visualize = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type: VisualizationKind,
    isDirtyStateAlert: boolean = false,
  ) => {
    event.preventDefault();
    visualizeActiveQuestionnaire(type, componentId, token, isDirtyStateAlert);
    setDropdownOpen(false);
  };

  const handleCloseModal = () => setAllowDuplicateVariablesModal(false);

  return (
    <div
      className={`btn-group${top ? ' dropup flex-column-reverse' : ' flex-column'}${dropdownOpen ? ' open' : ''}`}
      ref={wrapperRef}
    >
      <button
        id="visualize"
        className={`btn dropdown-toggle btn-yellow${disabled ? ' disabled' : ''}`}
        disabled={disabled}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={(e) => openDropDown(e)}
      >
        {Dictionary.visualise} <span className="caret" />
      </button>
      {!(
        allowDuplicateVariablesModal && hasQuestionnaireDuplicateVariables
      ) && (
        <ul className="dropdown-menu">
          {dropdownOptions.map((link) => {
            return (
              <li key={link.label}>
                <a
                  href="#"
                  onClick={(e) =>
                    visualize(
                      e,
                      link.type,
                      isDirtyState && link.unavailableInDirtyState,
                    )
                  }
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <ReactModal
        parentSelector={domSelectorForModal}
        isOpen={Boolean(
          allowDuplicateVariablesModal && hasQuestionnaireDuplicateVariables,
        )}
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

const dropdownOptions = [
  {
    type: VisualizationKind.HTML,
    label: Dictionary.VISUALIZE_WEB,
  },
  {
    type: VisualizationKind.Household,
    label: Dictionary.VISUALIZE_WEB_HOUSEHOLD,
  },
  {
    type: VisualizationKind.Business,
    label: Dictionary.VISUALIZE_WEB_BUSINESS,
  },
  {
    type: VisualizationKind.QueenCAPI,
    label: Dictionary.VISUALIZE_QUEEN_CAPI,
  },
  {
    type: VisualizationKind.QueenCATI,
    label: Dictionary.VISUALIZE_QUEEN_CATI,
  },
  {
    type: VisualizationKind.PDF,
    label: Dictionary.VISUALIZE_PDF,
  },
  {
    type: VisualizationKind.Spec,
    label: Dictionary.VISUALIZE_SPECIFICATION,
  },
  {
    type: VisualizationKind.Metadata,
    label: Dictionary.VISUALIZE_METADATA,
    unavailableInDirtyState: true,
  },
];
