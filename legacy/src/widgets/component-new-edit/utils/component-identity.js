import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

const { FILTER, LOOP } = COMPONENT_TYPE;

/**
 * Required Libellé / Identifiant fields: mirror validate-rules `required`
 * (empty, whitespace-only, or punctuation-only count as blank).
 * Needed because antlr-editor ≥ 2.9.4 no longer errors on empty expressions,
 * so VALIDER would stay enabled without this check.
 *
 * Only questions / sequences / roundabouts expose Libellé + Identifiant.
 * FILTER and LOOP do not — do not block VALIDER for them via this check.
 */
export function isBlankRequiredField(value) {
  return String(value ?? '')
    .trim()
    .replace(/[^\w\s]/gi, '') === '';
}

export function isMissingRequiredIdentity(label, name, componentType) {
  if (componentType === FILTER || componentType === LOOP) {
    return false;
  }
  return isBlankRequiredField(label) || isBlankRequiredField(name);
}
