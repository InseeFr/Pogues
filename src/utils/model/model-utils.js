/**
 * Contains comment
 *
 * Verify if exist a comment parsed in a string. In case it exists, the comment is returned.
 *
 * @param  {string}   str   String
 * @return {false|string} false if the comment is not present or the comment itself
 */
export function containsComment(str) {
  const regExpCmt = /##([^\n]*)/;
  return str.match(regExpCmt);
}

export function getQuestionLabelFromRaw(rawQuestionLabel) {
  // @TODO: Markdow is not parsed yed. Include this feature.
  const regExpCmt = /^(##{.*})?(.*)$/;
  const matches = rawQuestionLabel.match(regExpCmt);
  return matches[2].trim();
}
