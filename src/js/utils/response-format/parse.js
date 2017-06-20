import parseSimple from './parse/simple'
import parseSingle from './parse/single'
import parseMultiple from './parse/multiple'
import parseTable from './parse/table'

import { QUESTION_TYPE_ENUM } from '../../constants/schema'
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM

export function parseResponseFormat(question) {
  const { responses, responseStructure, questionType } = question
  switch (questionType) {
    case SIMPLE:
      return parseSimple(responses)
    case SINGLE_CHOICE:
      return parseSingle(responses)
    case MULTIPLE_CHOICE:
      return parseMultiple(responses, responseStructure)
    case TABLE:
      return parseTable(responses, responseStructure)
  }
}