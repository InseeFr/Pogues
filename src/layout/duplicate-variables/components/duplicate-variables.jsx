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
      <p>{Dictionary.duplicateVariables}</p>
      <div>
        <div className="duplicate-variables_header">
          <div>Variables</div>
          <div>
            <div>Questionnaire</div>
            <div>Collectée</div>
            <div>Calculée</div>
            <div>Externe</div>
          </div>
        </div>
        <div className="duplicate-variables_body">
          {Object.values(questDuplicateVariables).map(duplicated => (
            <div className="duplicate-variables_row" key={duplicated.variable}>
              <div>{duplicated.variable}</div>
              <div className="duplicate-variables_questionnaire">
                {(duplicated.isCollected ||
                  duplicated.isExternal ||
                  duplicated.isCalculated) && (
                  <div className="duplicate-variables_use" key="current">
                    <div>Questionnaire courant</div>
                    <div>{duplicated.isCollected ? 'X' : ' '}</div>
                    <div>{duplicated.isCalculated ? 'X' : ' '}</div>
                    <div>{duplicated.isExternal ? 'X' : ' '}</div>
                  </div>
                )}
                {Object.entries(duplicated.referenced).map(
                  ([extKey, extValue]) => (
                    <div className="duplicate-variables_use" key={extKey}>
                      <div>{extKey}</div>
                      <div>
                        {extValue === 'CollectedVariableType' ? 'X' : ' '}
                      </div>
                      <div>
                        {extValue === 'CalculatedVariableType' ? 'X' : ' '}
                      </div>
                      <div>
                        {extValue === 'ExternalVariableType' ? 'X' : ' '}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
