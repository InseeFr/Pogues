import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { ComponentEdit } from 'layout/component-edit';

const { LOOP } = COMPONENT_TYPE;

class NavLoop extends Component {
  static propTypes = {
    componentsStore: PropTypes.object.isRequired,
    removeComponent: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showComponentModal: false,
    };

    this.handleOpenComponentDetail = this.handleOpenComponentDetail.bind(this);
    this.handleCloseComponentDetail =
      this.handleCloseComponentDetail.bind(this);
    this.handleEditComponent = this.handleEditComponent.bind(this);
  }

  handleDeleteComponent = () => {
    this.props.removeComponent(this.props.editingComponentId);
    this.setState({ showComponentModal: false });
  };

  handleOpenComponentDetail() {
    this.setState({ showComponentModal: true });
  }

  handleEditComponent(id) {
    this.props.setEditingComponentId(id);
    this.handleOpenComponentDetail();
  }

  handleCloseComponentDetail() {
    this.setState({ showComponentModal: false });
  }

  render() {
    const { componentsStore, editingComponentId } = this.props;

    const options = Object.values(componentsStore)
      .filter(component => component.type === LOOP)
      .map(element => {
        return (
          <button
            className="loopLists"
            onClick={() => this.handleEditComponent(element.id)}
          >
            <span className="glyphicon glyphicon-menu-right" />
            {element.nameLoop}
          </button>
        );
      });
    const componentType =
      componentsStore[editingComponentId] &&
      componentsStore[editingComponentId].type;

    const componentHeader = Dictionary[`componentEdit${componentType}`] || '';
    return (
      <div>
        <ul>{options}</ul>
        <ReactModal
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showComponentModal}
          onRequestClose={this.handleCloseComponentDetail}
          contentLabel={componentHeader}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{componentHeader}</h3>
              <button type="button" onClick={this.handleCloseComponentDetail}>
                <span>X</span>
              </button>
            </div>
            <div className="popup-body">
              <ComponentEdit
                onCancel={this.handleCloseComponentDetail}
                onSuccess={this.handleCloseComponentDetail}
                deleteComponent={this.handleDeleteComponent}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default NavLoop;
