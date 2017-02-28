// data-json-utils
import { stripLeadingUnderscore, capitalize } from '../utils/name-utils';

const SIMPLE_FIELDS = ['_agency'];
const CLASS_FIELDS = ['_survey'];
const ARRAY_FIELDS = ['_componentGroups'];
const OBJECT_FIELDS = ['_codeLists'];

// Constants use for normalization
const CAPS = ['_name', '_survey', '_label', '_datatype', '_codeListReference', '_codeLists', '_codeList', '_codeListSpecification',
'_maxLength', '_pattern', '_ifTrue', '_next', '_expression', '_failMessage','_maximum', '_minimum', '_text', '_responseStructure',
'_totalLabel', '_decimals', '_value', '_format'];

// Field to rename
// Mainly fields in plural in Pogues model that need to be singular to be schema valid
//FIXME only the RENAME_MAPPING is useful, the RENAME const could be replace by Object.keys()
const RENAME = ['_children', '_responses', '_declarations', '_componentGroups', '_goTos', '_values', '_codes',
'_controls', '_visHint', '_dimensions', '_Member'];

const RENAME_MAPPING = {
  '_children':'Child',
  '_codes': 'Code',
  '_componentGroups': 'ComponentGroup',
  '_controls': 'Control',
  '_declarations': 'Declaration',
  '_goTos' : 'GoTo',
  '_Member': 'MemberReference',
  '_responses': 'Response',
  '_dimensions': 'Dimension',
  '_values': 'Value',
  '_visHint': 'visualizationHint'
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
  '_expression' : 'SIMPLE',
  '_failMessage': 'SIMPLE',
  '_format': 'SIMPLE',
  '_genericName': 'SIMPLE',
  '_id': 'SIMPLE',
  '_ifTrue': 'SIMPLE',
  '_label': 'SIMPLE',
  '_mandatory': 'SIMPLE',
  '_maximum': 'SIMPLE',
  '_maxLength': 'SIMPLE',
  '_minimum': 'SIMPLE',
  '_name': 'SIMPLE',
  '_pattern': 'SIMPLE',
  '_retrievalQuery': 'SIMPLE',
  '_simple': 'SIMPLE',
  '_text': 'SIMPLE',
  '_type': 'SIMPLE',
  '_typeName': 'SIMPLE',
  '_value': 'SIMPLE',
  '_visHint': 'SIMPLE',
  '_next': 'CLASS',
  '_survey': 'CLASS',
  '_children': 'ARRAY',
  '_codeList': 'ARRAY',
  '_codeListSpecification': 'ARRAY',
  '_codes': 'ARRAY',
  '_controls': 'ARRAY',
  '_componentGroups': 'ARRAY',
  '_declarations': 'ARRAY',
  '_dynamic': 'SIMPLE',
  '_goTos': 'ARRAY',
  '_members': 'ARRAY',
  '_responses': 'ARRAY',
  '_responseStructure': 'OBJECT',
  '_dimensions': 'ARRAY',
  '_values': 'ARRAY',
  '_codeLists': 'OBJECT',
  '_datatype': 'OBJECT',
  '_totalLabel': 'SIMPLE',
  '_special': 'OBJECT',
  '_code': 'SIMPLE',
  '_behaviour': 'SIMPLE',
  '_message': 'SIMPLE',
  '_componentGroups': 'ARRAY',
  '_Member': 'ARRAY',
  '_position': 'SIMPLE',
  '_NonResponseModality': 'OBJECT',
  '_firstIntentionDisplay': 'SIMPLE',
  '_Invite': 'SIMPLE',
  '_Label': 'SIMPLE',
  '_Value': 'SIMPLE',
  '_declarationType': 'SIMPLE',
  '_questionType': 'SIMPLE',
  '_dimensionType': 'SIMPLE'
  
  
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
    //TODO make serialization of arrays more robust
    a.push(typeof arr[i] === 'string' ? arr[i] : serializeObject(arr[i]));
  }
  return a;
}
