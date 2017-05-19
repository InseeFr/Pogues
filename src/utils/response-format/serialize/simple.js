import {
  DATATYPE_TYPE_FROM_NAME
} from '../../../constants/pogues-constants'
import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
import {  processDatatypeForSerialization } from '../../../reducers/datatype-utils' 

const { SIMPLE } = QUESTION_TYPE_ENUM

export default function simpleResponseFormat(format, mandatory) {
  const { typeName, [typeName]: datatype } = format
  return {
    questionType: SIMPLE,
    responses: [{
      // `simple` and `mandatory` are not exposed in the ui for now. These
      // attributes are not required, so we do not create them here, but they
      // could be added if the backend needs them.
      mandatory,
      datatype: {
        //TODO the `VisualizationHint` attribute of a datatype will not be
        //set : it's not exposed in the ui, and it is not required by the
        //model, so we do not create these properties. Check if it is ok
        //with the backend.
        ...processDatatypeForSerialization(datatype),
        //TODO document the use of `type` property ; it seems to be a
        //convention used in Pogues to represent in JSON which derived type
        //of an abstract type (in the XML Schema) is used. This property is
        //not represented in the reducer since it can be inferred.
        type: DATATYPE_TYPE_FROM_NAME[format.typeName]
      }
    }]
  }
}