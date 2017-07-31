import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

class ConfirmDialog extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.bool,
  };

  static defaultProps = {
    showConfirmModal: false,
  };

  constructor() {
    super();

    this.state = {
      showConfirmModal: false,
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.showConfirmModal !== this.state.showConfirmModal) {
      this.setState({ showConfirmModal: nextProps.showConfirmModal });
    }
  }
  handleValidate(event) {
    event.stopPropagation();
    this.setState({ showConfirmModal: false });
    this.props.confirm();
  }

  handleCancel(event) {
    event.stopPropagation();
    this.setState({ showConfirmModal: false });
  }

  render() {
    return (
      <ReactModal
        shouldCloseOnOverlayClick={false}
        isOpen={this.state.showConfirmModal}
        onRequestClose={this.handleCancel}
        className="confirm-modal"
      >
        <div className="popup">
          <div className="popup-body">
            <p>{Dictionary.confirmBodyMessage}</p>
            <p>{Dictionary.confirmQuestionMessage}</p>
          </div>
          <div className="ok-cancel-buttons">
            <button onClick={this.handleValidate} type="submit">{Dictionary.validate}</button>
            <button onClick={this.handleCancel} className="cancel">{Dictionary.cancel}</button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default ConfirmDialog;
