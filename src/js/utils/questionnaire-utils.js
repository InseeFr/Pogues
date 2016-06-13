import {nameFromLabel} from '../utils/name-utils';
import Logger from '../logger/logger';

var logger = new Logger('QuestionnaireUtils', 'Utils');

//TODO if useful, make it work with reducer
/*
 Search a component by id and apply a function to it.
 @param struct : the data structure in which we're looking up
 @param key : the key containing the value
 @param value : the *unique* value use to select a component
 @param func : the function to apply to the found element
 */
 //TODO currying ! functionnal !
 //TODO struct.flatMap.filter( checkId ).apply( func )
// export function searchAndApply (struct, key, value, func) {
//     logger.debug('searching for key :' + key + ' and value :' + value);

//     for (var i in struct) {
//       var component = struct[i];
//       if (component instanceof QuestionModel) {
//         if (component[key] === value) {
//           logger.debug('Found key ' + key + ' in component:', component);
//           func(component);
//         }
//       }
//       if (component instanceof SequenceModel) {
//         if (component[key] === value) {
//           func(component);
//         } else {
//           searchAndApply(component.children, key, value, func)
//         }
//       }
//     }
//   }


