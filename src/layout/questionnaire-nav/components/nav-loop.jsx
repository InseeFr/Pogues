import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Dictionary from '../../../utils/dictionary/dictionary';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { ComponentEdit } from '../../component-edit';

const { LOOP } = COMPONENT_TYPE;

function NavLoop({
  componentsStore,
  editingComponentId,
  removeComponent,
  setEditingComponentId,
}) {
  const [showComponentModal, setShowComponentModal] = useState(false);

  const handleDeleteComponent = useCallback(() => {
    removeComponent(editingComponentId);
    setShowComponentModal(false);
  }, [editingComponentId, removeComponent]);

  function handleOpenComponentDetail() {
    setShowComponentModal(true);
  }

  function handleEditComponent(id) {
    setEditingComponentId(id);
    handleOpenComponentDetail();
  }

  const handleCloseComponentDetail = useCallback(
    () => setShowComponentModal(false),
    [],
  );

  const options = Object.values(componentsStore)
    .filter(component => component.type === LOOP)
    .map(element => {
      return (
        <button
          className="loopLists"
          key={element.id}
          onClick={() => handleEditComponent(element.id)}
        >
          <span className="glyphicon glyphicon-menu-right" />
          {element.nameLoop}
        </button>
      );
    });
  const componentType = componentsStore[editingComponentId]?.type;

  const componentHeader = Dictionary[`componentEdit${componentType}`] || '';
  return (
    <div>
      <ul>{options}</ul>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showComponentModal}
        onRequestClose={handleCloseComponentDetail}
        contentLabel={componentHeader}
      >
        <div className="popup">
          <div className="popup-header">
            <h3>{componentHeader}</h3>
            <button type="button" onClick={handleCloseComponentDetail}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <ComponentEdit
              onCancel={handleCloseComponentDetail}
              onSuccess={handleCloseComponentDetail}
              deleteComponent={handleDeleteComponent}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

NavLoop.propTypes = {
  componentsStore: PropTypes.object.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

export default NavLoop;
