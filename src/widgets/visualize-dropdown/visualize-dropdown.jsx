import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import Dictionary from 'utils/dictionary/dictionary';

// PropTypes and defaultProps

const propTypes = {
  visualizeActiveQuestionnaire: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  top: PropTypes.bool.isRequired,
  componentId: PropTypes.string
};
const defaultProps = {
  visualizeActiveQuestionnaire: undefined,
  disabled: false,
  top: false,
  componentId: ''
};

/**
 * Component used in the actions toolbar and on each
 * component of the questionnaire. Will display a button
 * with a dropdown behavior with links to different
 * visualizations of the PDF : WEB, PDF or ODT
 */
class VisualizeDropdown extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Will toggle the dropdown menu
   */
  openDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  /**
   * Will open the questionnaire in a specific format, thanks to the type
   * parameter. Will also close the dropdown menu
   */
  visualize(event, type) {
    event.preventDefault();
    this.props.visualizeActiveQuestionnaire(type, this.props.componentId);
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        dropdownOpen: false
      });
    }
  }

  render() {
    const classDropDown = classSet({
      'btn-group': true,
      open: this.state.dropdownOpen
    });
    const classDropDownTrigger = classSet({
      btn: true,
      'dropdown-toggle': true,
      'btn-yellow': true,
      disabled: this.props.disabled
    });
    const classDropDownList = classSet({
      top: this.props.top,
      'dropdown-menu': true
    });
    return (
      <div className={classDropDown} ref={this.setWrapperRef}>
        <button
          className={classDropDownTrigger}
          disabled={this.props.disabled}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.dropdownOpen}
          onClick={e => this.openDropDown(e)}
        >
          {Dictionary.visualise}
          <span className="caret" />
        </button>
        <ul className={classDropDownList}>
          <li>
            <a href="#" onClick={e => this.visualize(e, 'html')}>
              {' '}
              {Dictionary.VISUALIZE_WEB}{' '}
            </a>
          </li>
          <li>
            <a href="#" onClick={e => this.visualize(e, 'pdf')}>
              {Dictionary.VISUALIZE_PDF}
            </a>
          </li>
          <li>
            <a href="#" onClick={e => this.visualize(e, 'spec')}>
              {Dictionary.VISUALIZE_SPECIFICATION}
            </a>
          </li>
          <li>
            <a href="#" onClick={e => this.visualize(e, 'ddi')}>
              DDI
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default VisualizeDropdown;
