import React, { Component } from 'react';
import { FieldArray, Field } from 'redux-form';
import PropTypes from 'prop-types';
import classSet from 'react-classset';
import { markdownToRaw } from 'layout/forms/controls/rich-textarea';

import Dictionary from 'utils/dictionary/dictionary';

function ListEntryFormItem({ fields, submitLabel, noValueLabel, reset, select, invalidItems, showAddButton }) {
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
                select(index);
              }}
            >
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
              {shortLabel}
            </button>
          </li>
        );
      })}
      {showAddButton &&
        <li>
          <button
            type="button"
            className="btn btn-link"
            onClick={event => {
              event.preventDefault();
              reset();
            }}
          >
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            {Dictionary[submitLabel]}
          </button>
        </li>}
    </ul>
  );
}

ListEntryFormItem.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  noValueLabel: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  invalidItems: PropTypes.object.isRequired,
  showAddButton: PropTypes.bool.isRequired,
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
    showAddButton: PropTypes.bool,
    showRemoveButton: PropTypes.bool,
    rerenderOnEveryChange: PropTypes.bool.isRequired,
    disableRemove: PropTypes.bool,
    disableDuplicate: PropTypes.bool,
  };
  static defaultProps = {
    errors: [],
    invalidItems: {},
    showDuplicateButton: true,
    showAddButton: true,
    showRemoveButton: true,
    disableRemove: false,
    disableDuplicate: false,
  };
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
      showAddButton,
      showRemoveButton,
      rerenderOnEveryChange,
      disableRemove,
      disableDuplicate,
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
          invalidItems={invalidItems}
          rerenderOnEveryChange={rerenderOnEveryChange}
          showAddButton={showAddButton}
        />

        <Field component="input" type="hidden" name="ref" />

        <div className="list-entry-form_form">
          <ul style={styleErrors} className="list-entry-form_form-errors">
            {errorsList}
          </ul>
          {inputView}

          <div className="list-entry-form_form-actions">
            <ul className="form-footer">
              {showRemoveButton &&
                <li>
                  <button
                    type="button"
                    disabled={disableRemove}
                    className="btn btn-link"
                    onClick={event => {
                      event.preventDefault();
                      remove();
                    }}
                  >
                    <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                    {Dictionary.remove}
                  </button>
                </li>}

              {showDuplicateButton &&
                <li>
                  <button
                    type="button"
                    className="btn btn-link"
                    disabled={disableDuplicate}
                    onClick={event => {
                      event.preventDefault();
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
                    submit();
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
