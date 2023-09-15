import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Dictionary from 'utils/dictionary/dictionary';
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
          {questDuplicateVariables
            .sort(
              (a, b) =>
                a.variableName > b.variableName ||
                (a.variableName === b.variableName &&
                  a.questionnaire > b.questionnaire) ||
                (a.variableName === b.variableName &&
                  a.questionnaire === b.questionnaire &&
                  a.variableType > b.variableType),
            )
            .map(duplicateVariable => (
              <div className="duplicate-variables_row">
                <div>{duplicateVariable.variableName}</div>
                <div>
                  {duplicateVariable.questionnaire === 'current'
                    ? Dictionary.currentQuestionnaire
                    : duplicateVariable.questionnaire}
                  {' ('}
                  {Dictionary[duplicateVariable.variableType]})
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
