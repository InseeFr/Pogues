import parseSimple from './parse/parse-response-format-simple';
import parseSingle from './parse/parse-response-format-single';
import parseMultiple from './parse/parse-response-format-multiple';
import parseTable from './parse/parse-response-format-table';
import { QUESTION_TYPE_ENUM } from 'constants/schema';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export default function parseResponseFormat(question) {
  const { responses, responseStructure, questionType } = question;
  switch (questionType) {
    case SIMPLE:
      return parseSimple(responses);
    case SINGLE_CHOICE:
      return parseSingle(responses);
    case MULTIPLE_CHOICE:
      return parseMultiple(responses, responseStructure);
    case TABLE:
      return parseTable(responses, responseStructure);
    default:
      return undefined;
  }
}
