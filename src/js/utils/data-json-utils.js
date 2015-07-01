// data-json-utils
import { stripLeadingUnderscore, capitalize } from '../utils/name-utils';

const SIMPLE_FIELDS = ['_agency'];
const CLASS_FIELDS = ['_survey'];
const ARRAY_FIELDS = ['_componentGroups'];
const OBJECT_FIELDS = ['_codeLists'];
const CAPS = ['_name','_survey', '_label'];

export function normalizeField(field) {
  if (CAPS.indexOf(field) > -1) {
    return capitalize(stripLeadingUnderscore(field));
  } else {
    return stripLeadingUnderscore(field);
  }
};
