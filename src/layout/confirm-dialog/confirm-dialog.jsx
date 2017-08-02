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

  componentDidUpdate() {
    if (this.state.showConfirmModal && this.cancelButton) {
      this.cancelButton.focus();
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
        contentLabel="Confirmation Popup"
      >
        <div className="popup">
          <div className="popup-header">
            <h3>
              {Dictionary.confirmBodyTitle}
            </h3>
          </div>
          <div className="popup-body">
            <p>{Dictionary.confirmBodyMessage}</p>
            <p>{Dictionary.confirmQuestionMessage}</p>
          </div>
          <div className="ok-cancel-buttons">
            <button onClick={this.handleValidate} className="validate">{Dictionary.validate}</button>
            <button
              ref={button => {
                this.cancelButton = button;
              }}
              onClick={this.handleCancel}
              className="cancel"
            >
              {Dictionary.cancel}
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default ConfirmDialog;
