export const EDIT_RESPONSE = 'EDIT_RESPONSE'
export const CHANGE_DATATYPE_NAME = 'CHANGE_DATATYPE_NAME'
export const CHANGE_DATATYPE_PARAM = 'CHANGE_DATATYPE_PARAM'
export const EDIT_RESPONSE_CHOOSE_CODE_LIST = 'EDIT_RESPONSE_CHOOSE_CODE_LIST'
export const SWITCH_FORMAT = 'SWITCH_FORMAT'

export const switchFormat = (id, format) => ({
  type: SWITCH_FORMAT,
  payload: {
    id,
    format
  }
})


export const editResponse = (id, update) => ({
  type: EDIT_RESPONSE,
  payload: {
    id,
    update
  }
})

export const editResponseChooseCodeList = (id, codeListId) => ({
  type: EDIT_RESPONSE_CHOOSE_CODE_LIST,
  payload: {
    id,
    codeListId
  }
})

export const changeDatatypeName = (id, typeName) => ({
  type: CHANGE_DATATYPE_NAME,
  payload: {
    id,
    typeName
  }
})

export const changeDatatypeParam = (id, update) => ({
  type: CHANGE_DATATYPE_PARAM,
  payload: {
    id,
    update
  }
})
