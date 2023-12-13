import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Dictionary from '../../../utils/dictionary/dictionary';
import { questionnaireDuplicateVariables } from '../utils/duplicate-variables-utils';

export function DuplicateVariables({
  id,
  collectedVariableByQuestion,
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  activeQuestionnaire,
  externalQuestionnairesVariables,
  activeComponentsById,
}) {
  const history = useHistory();
  const routeBackToQuestionnaire = useCallback(() => {
    const path = `/questionnaire/${id}`;
    history.push(path);
  }, [history, id]);
  const questDuplicateVariables = questionnaireDuplicateVariables(
    collectedVariableByQuestion,
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    activeQuestionnaire,
    externalQuestionnairesVariables,
    activeComponentsById,
  );
  const duplicateVariablesSet = [
    ...new Set(questDuplicateVariables.map(qdv => qdv.variableName)),
  ];

  return (
    <div className="duplicate-variables">
      <div className="questionList-cancel-zone">
        <button
          className="btn-grey glyphicon glyphicon-arrow-left questionList-cancel"
          type="button"
          onClick={() => routeBackToQuestionnaire()}
        >
          {Dictionary.cancel}
        </button>
      </div>
      <h3>{Dictionary.duplicateVariables}</h3>
      <div>
        <div className="duplicate-variables_header">
          <div>{Dictionary.duplicateVariablesHeader}</div>
          <div>{Dictionary.duplicateVariablesSource}</div>
        </div>
        <div className="duplicate-variables_body">
          {duplicateVariablesSet.map(duplicateVariable => (
            <div key={duplicateVariable} className="duplicate-variables_row">
              <div>{duplicateVariable}</div>
              <div className="duplicate-variables_questionnaire">
                {questDuplicateVariables
                  .filter(qdv => qdv.variableName === duplicateVariable)
                  .map(dv => (
                    <div
                      key={`${duplicateVariable}-${dv.questionnaire}-${dv.variableType}`}
                    >
                      {dv.questionnaire === 'current'
                        ? Dictionary.currentQuestionnaire
                        : dv.questionnaire}
                      {' ('}
                      {Dictionary[dv.variableType]}
                      {') '}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

DuplicateVariables.propTypes = {
  id: PropTypes.string.isRequired,
  collectedVariableByQuestion: PropTypes.object,
  activeExternalVariablesById: PropTypes.object,
  activeCalculatedVariablesById: PropTypes.object,
  activeQuestionnaire: PropTypes.object,
  externalQuestionnairesVariables: PropTypes.object,
  activeComponentsById: PropTypes.object,
};

DuplicateVariables.defaultProps = {
  collectedVariableByQuestion: {},
  activeExternalVariablesById: {},
  activeCalculatedVariablesById: {},
  activeQuestionnaire: {},
  externalQuestionnairesVariables: {},
  activeComponentsById: {},
};
