import React from 'react';
import Dictionary from 'utils/dictionary/dictionary';

export function DuplicateVariables({ questionnaireDuplicateVariables }) {
  return (
    <div className="duplicate-variables">
      <p>{Dictionary.duplicateVariables}</p>
      <ul>
        {Object.values(questionnaireDuplicateVariables).map(duplicated => (
          <li key={duplicated.variable}>
            {duplicated.variable}
            <ul>
              {duplicated.isCollected && <li key="COLLECTED">COLLECTED</li>}
              {duplicated.isExternal && <li key="EXTERNAL">EXTERNAL</li>}
              {duplicated.isCalculated && <li key="CALCULATED">CALCULATED</li>}
              {Object.entries(duplicated.referenced).map(
                ([extKey, extValue]) => (
                  <li key={extKey}>
                    {extKey} : {extValue}
                  </li>
                ),
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
