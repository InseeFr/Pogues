import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import classSet from 'react-classset';
import { markdownToRaw } from 'layout/forms/controls/rich-textarea';

import Dictionary from 'utils/dictionary/dictionary';

function ListEntryFormItem({ fields, submitLabel, noValueLabel, reset, select, setCurrentItemIndex, invalidItems }) {
  const noValueBlock =
    fields.length === 0 &&
    <li>
      {Dictionary[noValueLabel]}
    </li>;

  return (
    <ul className="list-entry-form_list">
      {noValueBlock}
      {fields.map((name, index, fields) => {
        const item = fields.get(index);
        const rawLabel = markdownToRaw(item.label || '').blocks[0].text;
        const shortLabel = rawLabel && rawLabel.length > 60 ? `${rawLabel.substr(0, 57)}...` : rawLabel;
        const invalidItemClass = classSet({
          invalid: Object.keys(invalidItems).indexOf(item.id) !== -1,
        });
        return (
          <li key={index} className={invalidItemClass}>
            <button
              type="button"
              title={item.label}
              className="btn btn-link"
              onClick={event => {
                event.preventDefault();
                setCurrentItemIndex(index);
                select(index);
              }}
            >
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
              {shortLabel}
            </button>
          </li>
        );
      })}
      <li>
        <button
          type="button"
          className="btn btn-link"
          onClick={event => {
            event.preventDefault();
            setCurrentItemIndex();
            reset();
          }}
        >
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          {Dictionary[submitLabel]}
        </button>
      </li>
    </ul>
  );
}

ListEntryFormItem.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  noValueLabel: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  setCurrentItemIndex: PropTypes.func.isRequired,
  invalidItems: PropTypes.object.isRequired,
};

class ListEntryForm extends Component {
  static propTypes = {
    inputView: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    duplicate: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    noValueLabel: PropTypes.string.isRequired,
    errors: PropTypes.array,
    invalidItems: PropTypes.object,
    showDuplicateButton: PropTypes.bool,
    rerenderOnEveryChange: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    errors: [],
    invalidItems: {},
    showDuplicateButton: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentItemIndex: '',
    };

    this.setCurrentItemIndex = this.setCurrentItemIndex.bind(this);
  }
  setCurrentItemIndex(index = '') {
    this.setState({
      currentItemIndex: index,
    });
  }
  render() {
    const {
      errors,
      inputView,
      submit,
      reset,
      select,
      remove,
      duplicate,
      listName,
      submitLabel,
      noValueLabel,
      invalidItems,
      showDuplicateButton,
      rerenderOnEveryChange,
      showDuplicateButton,
    } = this.props;

    const styleErrors = {
      display: errors.length > 0 ? 'block' : 'none',
    };
    const errorsList = errors.map((e, index) => {
      return (
        <li key={index}>
          {e}
        </li>
      );
    });

    return (
      <div className="list-entry-form">
        <FieldArray
          name={listName}
          component={ListEntryFormItem}
          submitLabel={submitLabel}
          noValueLabel={noValueLabel}
          reset={reset}
          select={select}
          setCurrentItemIndex={this.setCurrentItemIndex}
          invalidItems={invalidItems}
          rerenderOnEveryChange={rerenderOnEveryChange}
        />

        <div className="list-entry-form_form">
          <ul style={styleErrors} className="list-entry-form_form-errors">
            {errorsList}
          </ul>
          {inputView}

          <div className="list-entry-form_form-actions">
            <ul className="form-footer">
              <li>
                <button
                  type="button"
                  disabled={this.state.currentItemIndex === ''}
                  className="btn btn-link"
                  onClick={event => {
                    event.preventDefault();
                    this.setCurrentItemIndex();
                    remove(this.state.currentItemIndex);
                  }}
                >
                  <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                  {Dictionary.remove}
                </button>
              </li>
              {showDuplicateButton &&
                <li>
                  <button
                    type="button"
                    className="btn btn-link"
                    disabled={this.state.currentItemIndex === ''}
                    onClick={event => {
                      event.preventDefault();
                      this.setCurrentItemIndex();
                      duplicate();
                    }}
                  >
                    <span className="glyphicon glyphicon-file" aria-hidden="true" />
                    {Dictionary.duplicate}
                  </button>
                </li>}
              <li>
                <button
                  type="button"
                  className="btn-yellow"
                  onClick={event => {
                    event.preventDefault();
                    this.setCurrentItemIndex();
                    submit(this.state.currentItemIndex);
                  }}
                >
                  {Dictionary.validate}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="cancel"
                  onClick={event => {
                    event.preventDefault();
                    this.setCurrentItemIndex();
                    reset();
                  }}
                >
                  {Dictionary.cancel}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ListEntryForm;
