import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { domSelectorForModal } from '../../constants/dom-constants';
import Dictionary from '../../utils/dictionary/dictionary';

const ConfirmDialog = (props) => {
  const cancelButtonRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(
    props.showConfirmModal,
  );

  useEffect(() => {
    if (props.showConfirmModal !== showConfirmModal) {
      setShowConfirmModal(props.showConfirmModal);
    }
  }, [props.showConfirmModal, showConfirmModal]);

  useEffect(() => {
    if (showConfirmModal && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [showConfirmModal]);

  const handleValidate = (event) => {
    event.stopPropagation();
    setShowConfirmModal(false);
    props.confirm();
  };

  const handleCancel = (event) => {
    event.stopPropagation();
    props.closePopup();
    setShowConfirmModal(false);
  };

  return (
    <ReactModal
      parentSelector={domSelectorForModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      isOpen={showConfirmModal}
      onRequestClose={handleCancel}
      className="confirm-modal"
      contentLabel="Confirmation Popup"
    >
      <div className="popup">
        <div className="popup-header">
          <h3>{props.title}</h3>
        </div>
        <div className="popup-body">
          <p>{props.message}</p>
          <p>{Dictionary.confirmQuestionMessage}</p>
        </div>
        <div className="ok-cancel-buttons">
          <button onClick={handleValidate} className="validate">
            {Dictionary.validate}
          </button>
          <button
            ref={cancelButtonRef}
            onClick={handleCancel}
            className="cancel"
          >
            {Dictionary.cancel}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  showConfirmModal: PropTypes.bool,
  closePopup: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
  showConfirmModal: false,
};

export default ConfirmDialog;
