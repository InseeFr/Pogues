import React, { PropTypes, Component } from 'react';
import CodeListEditor from './code-list-editor'

export default function CodeListPicker(
  { id, codeLists, select, create, disabled, locale }) {

  const smartSelect = val => {
    switch (val) {
      case '_new':
        create()
        break
      case '':
        break
      default:
        select(val)
    }
  }
  return (
    <select className="form-control"
      disabled={disabled}
      onChange={e => smartSelect(e.target.value)}
      value={disabled ? '' : id} id="codeList">
      <option key={''} value={''}>
        {locale.selectCl}
      </option>
      <option key={'_new'} value={'_new'}>{locale.newCl}</option>
      {
        codeLists.map(({ id, label, isSpec }) => {
          const icon = isSpec ? '[R]' : '[U]'
          return <option key={id} value={id}>{icon} {label}</option>
        })
      }
    </select>
  );
}

CodeListPicker.propTypes = {
  //isSpec: PropTypes.bool, // true if the code list comes from a code list spec
  codeListId: PropTypes.string,
  codeLists: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}
