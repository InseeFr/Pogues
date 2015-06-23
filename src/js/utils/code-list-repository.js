var CodeListModel = require('../models/code-list')

var _codeLists = {

  }

function add(cl) {
  if (!_codeLists.hasOwnProperty(cl.id)) _codeLists[cl.id] = cl
  else throw new Error('A codeList with id ' + cl.id + ' already exists')
}

function addNew() {
  var cl = new CodeListModel()
  add(cl)
  return cl.id
}

add(new CodeListModel({
  _id: 'cl_propsal',
  _name: 'cl_propsal',
  _label: 'Proportion de salaire',
  _codes: [
    {value: 0, label: 'La moitié ou plus'},
    {value: 1, label: 'Moins de la moitié'}
  ]}))

add(new CodeListModel({
  _id: 'cl_sexe',
  _name: 'cl_sexe',
  _label: 'Sexe',
  _codes: [
    {value: 0, label: 'Homme'},
    {value: 1, label: 'Femme'}
  ]
}))


var CodelistRepository = {
  getAll: function() {
    return Object.keys(_codeLists).map(function (clId) {
      return _codeLists[clId]
    })
  },
  getFromId: function (id) {
    return _codeLists[id]
  },
  add: add
}

module.exports = CodelistRepository;