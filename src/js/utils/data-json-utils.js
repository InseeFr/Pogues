// data-json-utils
import { stripLeadingUnderscore, capitalize } from '../utils/name-utils';

const SIMPLE_FIELDS = ['_agency'];
const CLASS_FIELDS = ['_survey'];
const ARRAY_FIELDS = ['_componentGroups'];
const OBJECT_FIELDS = ['_codeLists'];

// Constants use for normalization
const CAPS = ['_name','_survey', '_label', '_declarations'];
const RENAME = ['_children'];
const RENAME_MAPPING = {'_children':'Child'};

/* Handle every field manipulation for schema compatibility. */
export function normalizeField(field) {
  if (CAPS.indexOf(field) > -1) {
    return capitalize(stripLeadingUnderscore(field));
  } else if (RENAME.indexOf(field) > -1) {
    return RENAME_MAPPING[field];
  } else {
    return stripLeadingUnderscore(field);
  }
};
