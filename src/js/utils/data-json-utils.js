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

export function serializeQuestionnaire(questionnaire) {
  // TODO recursively implements serialization

  // FIXME rename SIMPLE, SCALAR ?
  const mapping = {
    '_agency': 'SIMPLE',
    '_depth': 'SIMPLE',
    '_genericName': 'SIMPLE',
    '_id': 'SIMPLE',
    '_label': 'SIMPLE',
    '_name': 'SIMPLE',
    '_survey': 'CLASS',
    '_children': 'ARRAY',
    '_controls': 'ARRAY',
    '_componentGroups': 'ARRAY',
    '_declarations': 'ARRAY',
    '_goTos': 'ARRAY',
    '_codeLists': 'OBJECT'
  };
  const fns = {
    'SIMPLE': field => questionnaire[field],
    'CLASS': field => field,
    'ARRAY': field => field,
    'OBJECT': field => field // make something with the field
  };
  let o = {};
  o.Questionnaire = {};
  for (let i in Object.keys(questionnaire)) {
    let field = Object.keys(questionnaire)[i];
    console.log('Field is ', field);
    console.log('Mapping is ', mapping[field]);
    o[normalizeField(field)] = fns[mapping[field]](field);
  }
  return o;
}
