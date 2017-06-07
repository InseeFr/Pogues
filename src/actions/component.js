import { uuid } from 'utils/data-utils';
import { nameFromLabel } from 'utils/name-utils';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const EDIT_COMPONENT = 'EDIT_COMPONENT';

/**
 * Create component
 *
 * Synchronous component creation
 *
 * @param   {string}  questionnaireId questionnaire component id
 * @param   {string}  parentId parent component id
 * @param   {string}  type   type (question, sequence or sub-sequence)
 * @param   {string}  label  label for the newly created component
 * @returns {object}         CREATE_COMPONENT action
 */
export const createComponent = (questionnaireId, parentId, type, label) => ({
  type: CREATE_COMPONENT,
  payload: {
    questionnaireId,
    component: {
      id: uuid(),
      name: nameFromLabel(label),
      type,
      label,
    },
    parentId,
  },
});

/**
 * Edit component
 *
 * `update` is an object holding all the properties to update and their new
 * value.
 *
 * @param   {string}  componentId     component id
 * @param   {string}  questionnaireId questionnaire component id
 * @param   {object}  update properties which need to be updated
 * @returns {object}        EDIT_COMPONENT action
 */
export const editComponent = (componentId, questionnaireId, update) => ({
  type: EDIT_COMPONENT,
  payload: {
    componentId,
    questionnaireId,
    update,
  },
});
