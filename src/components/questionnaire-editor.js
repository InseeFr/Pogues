import React, { PropTypes, Component } from 'react';
import {nameFromLabel} from '../utils/name-utils';
import {rName} from '../utils/name-utils';
import { connect } from 'react-redux'
import { createQuestionnaire } from '../actions/questionnaire'

// TODO add change listener on dictionary store  to have a clean
// process, even if you don't expect changes in language settings
class QuestionnaireEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      label: '',
      nameEdited: false
    }
    this.handleLabelChange = this.handleLabelChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.disableNameGeneration = this.disableNameGeneration.bind(this)
  }

  componentDidMount() {
    this.inputName.focus();
  }

  // TODO Reintegrate ENTER KEY handling (taking care of conflict
  // with _handleChange). Removed for the sake of simplicity.
  /*	_handleKeyDown: function(event) {
      if (event.keyCode === PoguesConstants.GENERAL.ENTER_KEY_CODE) {
        this._addQuestionnaire(this.state.name);
      }
    },
  */
  handleLabelChange(event) {
    var label = event.target.value,
      name = this.state.nameEdited ? this.state.name : nameFromLabel(label);
    this.setState({ name, label })
  }

  handleNameChange(event) {
    var text = event.target.value.toUpperCase();
    if (!rName.test(text)) return;
    this.setState({ name: text })
  }

  disableNameGeneration() {
    this.setState({ nameEdited: true })
  }

  render() {
    const { name, label } = this.state
    const { createQuestionnaire, locale } = this.props
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">{locale.name}</label>
          <input className="form-control"
            type="text" value={name}
            ref={ref => this.inputName = ref}
            placeholder={locale.phName} onChange={this.handleNameChange}
            onKeyPress={this.disableNameGeneration}/>
        </div>
        <div className="form-group">
          <label htmlFor="name">{locale.title}</label>
          <input className="form-control"
            type="text" value={label}
            placeholder={locale.phLabel} onChange={this.handleLabelChange}/>
        </div>
        <button className="btn btn-primary" type="button"
          onClick={() => createQuestionnaire(name, label)}>
          {locale.create}
        </button>
    </div>
    )
  }
}

QuestionnaireEditor.propTypes = {
  createQuestionnaire: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = ({ locale }) => ({ locale })
export default connect(mapStateToProps, { createQuestionnaire })
  (QuestionnaireEditor)
