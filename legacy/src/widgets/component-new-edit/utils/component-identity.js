/**
 * Required Libellé / Identifiant fields: mirror validate-rules `required`
 * (empty, whitespace-only, or punctuation-only count as blank).
 * Needed because antlr-editor ≥ 2.9.4 no longer errors on empty expressions,
 * so VALIDER would stay enabled without this check.
 */
export function isBlankRequiredField(value) {
  return String(value ?? '')
    .trim()
    .replace(/[^\w\s]/gi, '') === '';
}

export function isMissingRequiredIdentity(label, name) {
  return isBlankRequiredField(label) || isBlankRequiredField(name);
}
