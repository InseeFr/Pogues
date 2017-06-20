import React, { PropTypes, Component } from 'react';
// import CodeListEditor from './code-list-editor'
import CodeListPicker from './code-list-picker'
import EditCodeListButton from './edit-code-list-button'

import { connect } from 'react-redux'
/**
 * Select a code list or create a new one (plus edition or visualization)
 *
 * This component enables:
 * - the selection of a code list within a list of code lists;
 * - visualization of the selected code list (if we are dealing with a code
 * list specification);
 * - or edition of the selected code list (other cases);
 * - creation of a new code list.
 *
 * The `edited` attribute depends on the context (a code list can be referred to
 * in many places in the questionnaire, and can be currently edited at some
 * places and not at others).
 *
 * This component does not have a state : when the code list is edited, this
 * information has to be saved elsewhere (in other words, an actions needs to be
 * triggered), hence the `edit` callback.
 */
class CodeListSelector extends Component {

  constructor(props) {
    super(props)

    this.create = () => {
      this.props.create()
    }
  }

  render() {
    const {
      codeLists, id, isSpec, toggle, edited, locale, select, disabled
    } = this.props

    return (
      <div>
        {/* do not add `input-group` class if there is no addon since the
            input width won't be 100% */}
         <div className={ id && 'input-group'}>
            <CodeListPicker id={id} codeLists={codeLists}
              select={select}
              disabled={disabled}
              create={this.create} locale={locale} />
            {
            id &&
              <EditCodeListButton
                edited={edited} isSpec={isSpec}
                toggle={toggle} />
            }
        </div>
      </div>
  )
  }

}

CodeListSelector.propTypes = {
  /**
   * List of code lists with detailes
   */
  codeLists: PropTypes.array.isRequired,
  /**
   * Id of the selected code list (might be `null`)
   */
  id: PropTypes.string,
  /**
   * Does the selected code list comes from a code list spec ?
   */
  isSpec: PropTypes.bool.isRequired,
  /**
   * Is the code list disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Is the code list being edited ?
   */
  edited: PropTypes.bool.isRequired,
  /**
   * callback function when a code list is selected
   */
  select: PropTypes.func.isRequired,
  /**
   * Callback function when create a new code list is chosen
   */
  create: PropTypes.func.isRequired,
  /**
   * Callback function when edit button is clicked
   */
  toggle: PropTypes.func.isRequired
}


const mapStateToProps = (state, { id }) => {
  const {
    appState: { questionnaire },
    codeListById,
    codeListByQuestionnaire: { [questionnaire]: codeListIds },
  } = state

  const codeLists = Object.keys(codeListById).reduce((cls, id) => {
    if (codeListIds.indexOf(id) > -1 || codeListById[id].isSpec)
      cls.push(codeListById[id])
    return cls
  }, [])

  return {
    isSpec: id && state.codeListById[id].isSpec || false,
    questionnaire,
    codeLists
  }
}

export default connect(mapStateToProps)(CodeListSelector)
