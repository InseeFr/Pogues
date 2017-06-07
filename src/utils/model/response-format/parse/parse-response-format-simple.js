import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { emptyFormat } from '../parse-format-utils';
import { parseDatatype } from 'utils/model/data-types/data-types-utils';

const { SIMPLE } = QUESTION_TYPE_ENUM;

export default function parseSimple(responses) {
  // There should be only one response
  // TODO throw error if more than one response
  const response = responses[0];
  const { mandatory, datatype } = response;
  const { typeName } = datatype;
  const emptySimple = emptyFormat[SIMPLE];
  const emptyDatatype = emptySimple[typeName];
  const simpleFormat = {
    ...emptySimple,
    typeName,
    [typeName]: {
      ...emptyDatatype,
      ...parseDatatype(datatype),
    },
  };
  return {
    ...emptyFormat,
    mandatory: mandatory || false, // ensure compatibility with old qrs
    type: SIMPLE,
    [SIMPLE]: simpleFormat,
  };
}
