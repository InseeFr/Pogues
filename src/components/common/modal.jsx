import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    title: PropTypes.string,
    closeOnSucces: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    closeOnSucces: false,
    onSuccess: () => {},
    onCancel: () => {},
  };

  constructor({ isOpen, component, title, closeOnSucces, onSuccess, onCancel }) {
    super();

    this.state = {
      showModal: isOpen,
    };

    this.contentLabel = title;
    this.component = component;

    if (closeOnSucces) {
      this.onSuccess = () => {
        onSuccess();
        this.handleCloseModal();
      };
    } else {
      this.onSuccess = onSuccess;
    }

    this.onCancel = () => {
      onCancel();
      this.handleCloseModal();
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Créer un questionnaire vide"
        onRequestClose={this.handleCloseModal}
      >
        <component onCancel={this.onCancel} onSuccess={this.onSuccess} />
      </ReactModal>
    );
  }
}

export default Modal;
