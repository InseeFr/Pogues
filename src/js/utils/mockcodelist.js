var CodeListModel = require('../models/CodeList')

var _codeLists = {
  'cl_propsal': new CodeListModel({
    _id: 'cl_propsal',
    _name: 'cl_propsal',
    _label: 'Proportion de salaire',
    _codes: [
      {value: 0, label: 'La moitié ou plus'},
      {value: 1, label: 'Moins de la moitié'}
    ]}),
  'cl_sexe': new CodeListModel({
      _id: 'cl_sexe',
      _name: 'cl_sexe',
      _label: 'Sexe',
      _codes: [
        {value: 0, label: 'Homme'},
        {value: 1, label: 'Femme'}
      ]
    })
  }

var CodelistRepository = {
  getAll: function() {
    return Object.keys(_codeLists).map(function (clId) {
      return _codeLists[clId]
    })
  },
  getFromId: function (id) {
    return _codeLists[id]
  }
}

module.exports = CodelistRepository;