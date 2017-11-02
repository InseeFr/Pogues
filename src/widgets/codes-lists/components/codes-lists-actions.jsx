import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { ACTIONS } from '../constants';

const { ACTIONS_CLASS, ACTIONS_MOVEMENT_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

const propTypes = {
  disabledActions: PropTypes.arrayOf(PropTypes.string),
  remove: PropTypes.func.isRequired,
  showAdd: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  duplicate: PropTypes.func.isRequired,
  moveUp: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired,
};

const defaultProps = {
  disabledActions: [],
};

// Component

class CodesListsActions extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = { openendDropdown: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({ openendDropdown: !this.state.openendDropdown });
  }

  render() {
    const { disabledActions, remove, showAdd, edit, duplicate, moveUp, moveDown, moveLeft, moveRight } = this.props;

    return (
      <div className={ACTIONS_CLASS}>
        <button type="button" onClick={edit} disabled={disabledActions.indexOf(ACTIONS.EDIT) !== -1}>
          <span className="sr-only"> {Dictionary.editCode}</span>
          <span className="glyphicon glyphicon-edit" />
        </button>
        <button type="button" onClick={showAdd} disabled={disabledActions.indexOf(ACTIONS.SHOW_ADD) !== -1}>
          <span className="sr-only"> {Dictionary.addCode}</span>
          <span className="glyphicon glyphicon-plus" />
        </button>
        <button type="button" onClick={duplicate} disabled={disabledActions.indexOf(ACTIONS.DUPLICATE) !== -1}>
          <span className="sr-only"> {Dictionary.duplicate}</span>
          <span className="glyphicon glyphicon-duplicate" />
        </button>
        <button type="button" onClick={remove} disabled={disabledActions.indexOf(ACTIONS.REMOVE) !== -1}>
          <span className="sr-only"> {Dictionary.remove}</span>
          <span className="glyphicon glyphicon-trash" />
        </button>

        <div className={ACTIONS_MOVEMENT_CLASS}>
          <button
            type="button"
            onClick={() => {
              this.toggleDropdown();
            }}
          >
            Déplacer
          </button>
          <div
            className={ClassSet({
              [`${ACTIONS_MOVEMENT_CLASS}-toggle`]: true,
              show: this.state.openendDropdown,
            })}
          >
            <div>
              <button type="button" onClick={moveUp} disabled={disabledActions.indexOf(ACTIONS.MOVE_UP) !== -1}>
                <span className="glyphicon glyphicon-arrow-up" />
              </button>
            </div>
            <div>
              <button type="button" onClick={moveDown} disabled={disabledActions.indexOf(ACTIONS.MOVE_DOWN) !== -1}>
                <span className="glyphicon glyphicon-arrow-down" />
              </button>
            </div>
            <div>
              <button type="button" onClick={moveRight} disabled={disabledActions.indexOf(ACTIONS.MOVE_RIGHT) !== -1}>
                <span className="glyphicon glyphicon-arrow-right" />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={moveLeft}
                onKeyDown={e => {
                  if (e.key === 'Tab') this.toggleDropdown();
                }}
                disabled={disabledActions.indexOf(ACTIONS.MOVE_LEFT) !== -1}
              >
                <span className="glyphicon glyphicon-arrow-left" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CodesListsActions;
