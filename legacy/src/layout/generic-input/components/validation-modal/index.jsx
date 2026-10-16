import React from 'react';

import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { domSelectorForModal } from '@/constants/dom-constants';
import Dictionary from '@/utils/dictionary/dictionary';

const ValidationModal = ({ isOpen, errors = undefined, onClose }) => {
  return (
    <ReactModal
      parentSelector={domSelectorForModal}
      isOpen={isOpen}
      ariaHideApp={false}
      className="custom-modal validation-error"
    >
      <p className="validation-error-title">{Dictionary.validationAtSave}</p>
      <div className="details-error">
        {errors && errors.length > 0 && (
          <ul>
            {errors.map((msg) => (
              <li className="api-error-message" key={msg}>
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={onClose} className="modal-button">
        {Dictionary.fixQuestionnaire}
      </button>
    </ReactModal>
  );
};

ValidationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
};

export default ValidationModal;
