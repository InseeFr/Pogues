// According to the swagger documentation, qrList is an object with
// questionnaire ids as key, and an object with `id`, `name`, `'label`,
// `agency` and `survey` as values. A survey is made of an `id`, a
// `name` and an `agency`
import { toArray } from 'utils/array-utils';

export function qListToState(model) {
  return toArray(model).reduce((update, qr) => {
    const {
       _id, _name, _label, _agency,
      _survey: {
        _id: surveyId,
        _name: surveyName, //TODO investigate, survey name seems to be the only
                           //property not prefixed by ``
        _agency: surveyAgency
      }
    } = qr
    update[_id] = {
      id: _id,
      name: _name,
      // label: label[0], // in the questionnaire list, label is a string not
      label: _label, // in the questionnaire list, label is a string not
                    // an array
      agency: _agency,
      survey: {
        id: surveyId,
        name: surveyName,
        agency: surveyAgency
      }
    }
    return update
  }, {})
}
