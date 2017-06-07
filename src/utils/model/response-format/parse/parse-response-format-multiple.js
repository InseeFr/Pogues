import { DIMENSION_TYPE, DATATYPE_NAME, DATATYPE_VIS_HINT } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { emptyFormat } from '../parse-format-utils';

const { MEASURE } = DIMENSION_TYPE;
const { BOOLEAN } = DATATYPE_NAME;
const { CHECKBOX } = DATATYPE_VIS_HINT;
const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

export default function parseMultiple(responses, responseStructure) {
  const { dimensions } = responseStructure;
  const [primaryDimension, measureDimension] = dimensions;
  let result = {};
  if (measureDimension.dimensionType === MEASURE && !Object.prototype.hasOwnProperty.call(measureDimension, 'label')) {
    const response = responses[0];
    // ohter checks could be:
    // primaryDimension.hasOwnProperty('codeListRefernce')
    if (Object.prototype.hasOwnProperty.call(response, 'codeListReference')) {
      // TODO make utility functions or simple objects to make creation of
      // formats more constistent across the application
      result = {
        ...emptyFormat,
        type: MULTIPLE_CHOICE,
        [MULTIPLE_CHOICE]: {
          infoCodeList: primaryDimension.codeListReference || '',
          measureBoolean: false,
          measureCodeList: response.codeListReference || '',
          measureVisHint: response.datatype.visHint,
        },
      };
    }
    if (response.datatype.typeName === BOOLEAN) {
      result = {
        ...emptyFormat,
        type: MULTIPLE_CHOICE,
        [MULTIPLE_CHOICE]: {
          infoCodeList: primaryDimension.codeListReference || '',
          measureBoolean: true,
          measureCodeList: '',
          measureVisHint: CHECKBOX,
        },
      };
      // TODO throw an error ? The second dimension is a measure with no label,
      // it cannot be a TABLE format
    }
  }
  return result;
}
