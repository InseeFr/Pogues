import { QUESTION_TYPE_ENUM } from '../../constants/schema'
import simpleResponseFormat from './serialize/simple'
import singleResponseFormat from './serialize/single'
import multipleResponseFormat from './serialize/multiple'
import tableResponseFormat from './serialize/table'

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM
export function serializeResponseFormat(responseFormat, codeListById) {
  const { type, [type]: format, mandatory } = responseFormat
  switch (type) {
    case SIMPLE:
      return simpleResponseFormat(format, mandatory)
    case SINGLE_CHOICE:
      return singleResponseFormat(format, mandatory)
    case MULTIPLE_CHOICE:
      return multipleResponseFormat(format, mandatory, codeListById)
    case TABLE:
      return tableResponseFormat(format, mandatory, codeListById)
  }
}