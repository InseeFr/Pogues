// data-json-utils
import { stripLeadingUnderscore, capitalize } from '../utils/name-utils';

const SIMPLE_FIELDS = ['_agency'];
const CLASS_FIELDS = ['_survey'];
const ARRAY_FIELDS = ['_componentGroups'];
const OBJECT_FIELDS = ['_codeLists'];

// Constants use for normalization
const CAPS = ['_name', '_survey', '_label', '_datatype', '_codeListReference', '_codeLists', '_codeList',
'_maxLength', '_pattern', '_ifTrue', '_ifFalse', '_next', '_expression', '_failMessage'];

// Field to rename
// Mainly fields in plural in Pogues model that need to be singular to be schema valid
//FIXME only the RENAME_MAPPING is useful, the RENAME const could be replace by Object.keys()
const RENAME = ['_children', '_responses', '_declarations', '_componentGroups', '_goTos', '_members', '_values', '_codes',
'_controls'];
const RENAME_MAPPING = {
  '_children':'Child',
  '_codes': 'Code',
  '_componentGroups': 'ComponentGroup',
  '_controls': 'Control',
  '_declarations': 'Declaration',
  '_goTos' : 'GoTo',
  '_members': 'Member',
  '_responses': 'Response',
  '_values': 'Value'
  };

// Factory and mapping
// FIXME rename SIMPLE, SCALAR ?
const MAPPING = {
  '_agency': 'SIMPLE',
  '_codeListReference': 'SIMPLE',
  '_criticity': 'SIMPLE',
  '_decimals': 'SIMPLE',
  '_depth': 'SIMPLE',
  '_description': 'SIMPLE',
  '_disjoinable': 'SIMPLE',
  '_failMessage': 'SIMPLE',
  '_format': 'SIMPLE',
  '_genericName': 'SIMPLE',
  '_id': 'SIMPLE',
  '_label': 'SIMPLE',
  '_mandatory': 'SIMPLE',
  '_maximum': 'SIMPLE',
  '_maxLength': 'SIMPLE',
  '_minimum': 'SIMPLE',
  '_name': 'SIMPLE',
  '_pattern': 'SIMPLE',
  '_simple': 'SIMPLE',
  '_text': 'SIMPLE',
  '_type': 'SIMPLE',
  '_typeName': 'SIMPLE',
  '_visualizationHint': 'SIMPLE',
  '_expression' : 'CLASS',
  '_ifTrue': 'CLASS',
  '_ifFalse': 'CLASS',
  '_next': 'CLASS',
  '_survey': 'CLASS',
  '_children': 'ARRAY',
  '_codes': 'ARRAY',
  '_controls': 'ARRAY',
  '_componentGroups': 'ARRAY',
  '_declarations': 'ARRAY',
  '_goTos': 'ARRAY',
  '_members': 'ARRAY',
  '_responses': 'ARRAY',
  '_values': 'ARRAY',
  '_codeLists': 'OBJECT',
  '_datatype': 'OBJECT'
};

const factory = {
  'SIMPLE': (field, obj) => obj[field],
  'CLASS': (field, obj) => serializeObject(obj[field]),
  'ARRAY': (field, obj) => serializeArray(obj[field]),
  'OBJECT': (field, obj) => serializeObject(obj[field])
};

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

export default function serializeQuestionnaire(questionnaire) {
  // TODO recursively implements serialization
  let o = {};
  o.Questionnaire = serializeObject(questionnaire);
  return o;
}

function serializeObject(obj) {
  let o = {};
  for (let i in Object.keys(obj)) {
    let field = Object.keys(obj)[i];
    o[normalizeField(field)] = factory[MAPPING[field]](field, obj);
  }
  return o;
}

function serializeArray(arr) {
  let a = [];
  for (let i in arr) {
    a.push(serializeObject(arr[i]));
  }
  return a;
}
