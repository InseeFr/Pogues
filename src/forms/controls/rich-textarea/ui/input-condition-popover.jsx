import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { INPUT_CONDITION_POPOVER } from '../../../../constants/dom-constants';

const { COMPONENT_CLASS, INNER, BUTTONGROUP, CONDITION, INPUT } =
  INPUT_CONDITION_POPOVER;

// Utils

const emptyCondition = { condition: '', label: '' };

function validateConditions(conditions) {
  for (let i = 0; i < conditions.length; i += 1) {
    if (conditions[i].condition === '' || conditions[i].label === '')
      return false;
  }

  return true;
}

// PropTypes and defaultProps

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

const defaultProps = {
  className: '',
  showInvalidConditions: false,
};

// Component

class InputConditionPopover extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      conditions: this.props.data.conditions || [{ ...emptyCondition }],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCondition = this.addCondition.bind(this);
    this.removeCondition = this.removeCondition.bind(this);
    this.toggleInvalidConditions = this.toggleInvalidConditions.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeydown);
    if (this.conditionRef) {
      this.conditionRef.focus();
      this.conditionRef.value = this.props.data.condition || '';
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  onSubmit() {
    const valid = validateConditions(this.state.conditions);

    if (valid) {
      this.doSubmit();
    }
    this.toggleInvalidConditions();
  }

  onDocumentClick(event) {
    const rootNode = ReactDOM.findDOMNode(this);
    if (!rootNode.contains(event.target)) {
      // Here we pass the event so the parent can manage focus.
      this.props.onCancel(event);
    }
  }

  onDocumentKeydown(event) {
    if (event.keyCode === 27) {
      this.props.onCancel();
    }
  }

  onChange(value, index, property) {
    this.setState(prevState => {
      const newConditions = [...prevState.conditions];
      newConditions[index][property] = value;
      return { conditions: newConditions };
    });
  }

  toggleInvalidConditions() {
    this.setState(prevState => ({
      showInvalidConditions: !prevState.showInvalidConditions,
    }));
  }

  doSubmit() {
    return this.props.onSubmit(this.state.conditions);
  }

  addCondition() {
    this.setState(prevState => ({
      conditions: [...prevState.conditions, { ...emptyCondition }],
    }));
  }

  removeCondition(index) {
    this.setState(prevState => ({
      conditions: [...prevState.conditions].splice(index, 1),
    }));
  }

  renderCondition({ condition, label }, index) {
    return (
      <div className={CONDITION} key={index}>
        <div>
          <input
            type="text"
            value={condition}
            placeholder="Condition"
            className={INPUT}
            onChange={event => {
              const { value } = event.currentTarget;
              this.onChange(value, index, 'condition');
            }}
          />
          <input
            type="text"
            value={label}
            placeholder="Label"
            className={INPUT}
            onChange={event => {
              const { value } = event.currentTarget;
              this.onChange(value, index, 'label');
            }}
          />
        </div>
        <div>
          <span
            role="button"
            tabIndex={0}
            className="glyphicon glyphicon-remove"
            onClick={() => {
              this.removeCondition(index);
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { className } = this.props;
    return (
      <div className={`${COMPONENT_CLASS} ${className}`}>
        <div className={INNER}>
          {this.state.showInvalidConditions && <div>Invalid conditions</div>}
          {this.state.conditions.map((c, index) =>
            this.renderCondition(c, index),
          )}

          <div style={{ color: 'red' }}>
            <b>ToDo</b>ButtonGroup
          </div>
          {/* <ButtonGroup className={BUTTONGROUP}>
            <IconButton
              label="Add condition"
              iconName="new-condition"
              onClick={this.addCondition}
            />
            <IconButton
              label="Submit"
              iconName="accept"
              onClick={this.onSubmit}
            />
            <IconButton
              label="Cancel"
              iconName="cancel"
              onClick={this.props.onCancel}
            />
          </ButtonGroup> */}
        </div>
      </div>
    );
  }
}

export default InputConditionPopover;
