// According to the swagger documentation, qrList is an object with
// questionnaire ids as key, and an object with `id`, `name`, `'label`,
// `agency` and `survey` as values. A survey is made of an `id`, a
// `name` and an `agency`

export function qListToState(model) {
  return Object.keys(model).reduce((update, qrId) => {
    const {
       _id, _name, _label, _agency, 
      _survey: {
        _id: _surveyId,
        name: _surveyName, //TODO investigate, survey name seems to be the only
                           //property not prefixed by `_`
        _agency: _surveyAgency
      }
    } = model[qrId]
    update[qrId] = {
      id: _id,
      name: _name,
      label: _label[0],
      agency: _agency,
      survey: {
        id: _surveyId,
        name: _surveyName,
        agency: _surveyAgency
      }
    }
    return update
  }, {})
}