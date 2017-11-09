import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import classSet from 'react-classset';

class VisualizeDropDown extends Component {
  static propTypes = {
    visualizeActiveQuestionnaire: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    top: PropTypes.bool.isRequired,
    componentId: PropTypes.string,
  };
  static defaultProps = {
    visualizeActiveQuestionnaire: undefined,
    disabled: false,
    top: false,
    componentId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  visualize(event, type) {
    event.preventDefault();
    this.props.visualizeActiveQuestionnaire(type, this.props.componentId);
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  openDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    const classDropDown = classSet({
      'btn-group': true,
      open: this.state.dropdownOpen,
    });
    const classDropDownTrigger = classSet({
      btn: true,
      'dropdown-toggle': true,
      'btn-yellow': true,
      disabled: this.props.disabled,
    });
    const classDropDownList = classSet({
      top: this.props.top,
      'dropdown-menu': true,
    });
    return (
      <div className={classDropDown}>
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
        </ul>
      </div>
    );
  }
}

export default VisualizeDropDown;
