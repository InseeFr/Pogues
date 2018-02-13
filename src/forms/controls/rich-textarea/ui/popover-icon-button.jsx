import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from './icon-button';

// PropTypes and defaultProps

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onTogglePopover: PropTypes.func.isRequired,
  InputPopover: PropTypes.func.isRequired,
  showPopover: PropTypes.bool,
  placeholder: PropTypes.string,
  data: PropTypes.object
};

const defaultProps = {
  showPopover: false,
  placeholder: '',
  data: {}
};

// Component

class PopoverIconButton extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.renderPopover = this.renderPopover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
  }

  onSubmit(...params) {
    this.props.onSubmit(...params);
  }

  hidePopover(...params) {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...params);
    }
  }

  renderPopover() {
    const { showPopover, placeholder, InputPopover, data } = this.props;

    if (!showPopover) {
      return null;
    }
    return (
      <InputPopover
        onSubmit={this.onSubmit}
        onCancel={this.hidePopover}
        placeholder={placeholder}
        data={data}
      />
    );
  }

  render() {
    const { onTogglePopover, showPopover, InputPopover, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <IconButton {...props} onClick={onTogglePopover}>
        {this.renderPopover()}
      </IconButton>
    );
  }
}

export default PopoverIconButton;
