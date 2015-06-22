var CodeListModel = require('../models/CodeList')

var CodelistRepository = {
  'cl_propsal': new CodeListModel({
    id: 'cl_propsal',
    name: 'cl_propsal',
    label: 'Proportion de salaire',
    codes: [
      {value: 0, label: 'La moitié ou plus'},
      {value: 1, label: 'Moins de la moitié'}
    ]}),
  'cl_sexe': new CodeListModel({
      id: 'cl_sexe',
      name: 'cl_sexe',
      label: 'Sexe',
      codes: [
        {value: 0, label: 'Homme'},
        {value: 1, label: 'Femme'}
      ]
    })
  }

module.exports = CodelistRepository;