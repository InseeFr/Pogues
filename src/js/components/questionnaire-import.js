import React, { PropTypes, Component } from 'react';
import {nameFromLabel} from '../utils/name-utils';
import {rName} from '../utils/name-utils';
import Logger from '../logger/logger';
import { connect } from 'react-redux'
import { importQuestionnaire } from '../actions/questionnaire'

var logger = new Logger('QuestionnaireImport', 'Components');

// TODO add change listener on dictionary store  to have a clean
// process, even if you don't expect changes in language settings
class QuestionnaireImport extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idToImport: ''
    }
    this.handleIdChange = this.handleIdChange.bind(this)
  }

  // TODO Reintegrate ENTER KEY handling (taking care of conflict
  // with _handleChange). Removed for the sake of simplicity.
  /*	_handleKeyDown: function(event) {
      if (event.keyCode === PoguesConstants.GENERAL.ENTER_KEY_CODE) {
        this._addQuestionnaire(this.state.name);
      }
    },
  */
  handleIdChange(event) {
    var idToImport = event.target.value;
    this.setState({ idToImport })
  }

  render() {
    const { idToImport } = this.state
    const { importQuestionnaire, locale } = this.props
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">{locale.idRMeS}</label>
          <input className="form-control"
            type="text" value={idToImport}
            placeholder={locale.labelImportRMeS} onChange={this.handleIdChange}/>
        </div>
        <button className="btn btn-primary" type="button"
          onClick={() => importQuestionnaire(idToImport)}>
          {locale.import}
        </button>
    </div>
    )
  }
}

QuestionnaireImport.propTypes = {
  importQuestionnaire: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = ({ locale }) => ({ locale })
export default connect(mapStateToProps, { importQuestionnaire })
  (QuestionnaireImport)
