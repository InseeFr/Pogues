import Dictionary from '../dictionary/dictionary';

export function getIntegrityErrors(integrityErrorsByType) {
  return Object.keys(integrityErrorsByType).reduce((acc, type) => {
    const integrityErrors = integrityErrorsByType[type].map(e =>
      e.dictionary ? Dictionary[e.dictionary] : e.message,
    );
    return [...acc, ...integrityErrors];
  }, []);
}
