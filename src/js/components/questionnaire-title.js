import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { GENERAL } from '../constants/pogues-constants';
import Logger from '../logger/logger';
import { 
  editComponent
} from '../actions/component'

var logger = new Logger('QuestionnaireTitle', 'Components');

class QuestionnaireTitle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      title: this.props.label
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editMode) {
      this.setState({ title: nextProps.label })
    }
  }


  componentDidUpdate() {
    if (this.state.editMode) this.titleInput.focus()
  }

  handleClick() {
    this.setState({editMode: true })
  }

  handleKeyDown(event) {
    //TODO handle on blur might be enough
    if (event.keyCode === GENERAL.ENTER_KEY_CODE) {
      this.setState({ editMode: false })
      this.props.handleEnterKeyDown(this.props.id, { label: this.state.title })
    }
  }

  handleOnBlur(event) {
    this.setState({editMode: false})
    this.props.handleEnterKeyDown(this.props.id, this.state.title)
  }

  handleInputChange(event) {
    this.setState({title: event.target.value});
  }

  render() {
    const { title, editMode } = this.state
    const { id, handleEnterKeyDown, handleInputChange, handleClick } =
      this.props
    if (editMode) {
      return(
        <div className="navbar-form navbar-left">
          <div className="form-group">
            <input ref={node => this.titleInput = node }
              type="text" className="form-control"
              value={title}
              onKeyDown={this.handleKeyDown} onChange={this.handleInputChange}
              onBlur={this.handleOnBlur} />
          </div>
        </div>
      );
    } else {
      return (
        <span className="navbar-text" onClick={this.handleClick}>
          {title}
        </span>
      );
    }
  }
}

QuestionnaireTitle.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleEnterKeyDown: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  //TODO should not need appState to know the questionnaire
  const id = state.appState.questionnaire // questionnaire id
  const qrState = state.appState.questionnaireById[id]
  let label
  if (!qrState.loaded) label='(...)'
  // a questionnaire is a component : that's where save properties like
  // label
  else label = state.componentById[id].label
  return {
    id,
    label: label || 'EDIT ME'
  }
}

const mapDispatchToProps = {
  handleEnterKeyDown: editComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireTitle)
