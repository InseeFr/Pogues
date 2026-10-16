import { useCallback, useRef, useState } from 'react';

/**
 * Several VTL editors share one VALIDER / panel flag. A boolean last-write-wins
 * is wrong: an empty/valid sibling clears another field's syntax error.
 * Aggregate per source id instead.
 */
export function useAggregatedDisableValidation(onAggregateChange) {
  const flagsRef = useRef({});
  const callbacksRef = useRef({});
  const [disabled, setDisabled] = useState(false);

  const publish = useCallback(() => {
    const any = Object.values(flagsRef.current).some(Boolean);
    setDisabled(any);
    onAggregateChange?.(any);
  }, [onAggregateChange]);

  const getSetDisableValidation = useCallback(
    (sourceId) => {
      if (!callbacksRef.current[sourceId]) {
        callbacksRef.current[sourceId] = (isDisable) => {
          flagsRef.current[sourceId] = Boolean(isDisable);
          publish();
        };
      }
      return callbacksRef.current[sourceId];
    },
    [publish],
  );

  const clearSource = useCallback(
    (sourceId) => {
      flagsRef.current[sourceId] = false;
      publish();
    },
    [publish],
  );

  return { disabled, getSetDisableValidation, clearSource };
}
