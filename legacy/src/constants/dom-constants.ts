export const WIDGET_CODES_LISTS = {
  COMPONENT_CLASS: 'widget-codes-lists',
  CODES_CLASS: 'widget-codes-lists__codes',
  LIST_CLASS: 'widget-codes-lists__codes__list',
  CODE_INPUT_CLASS: 'widget-codes-lists__codes__input',
  CODE_INPUT_CODE_CLASS: 'widget-codes-lists__codes__input-code',
  CODE_INPUT_CODE_CLASS_PRECISION:
    'widget-codes-lists__codes__input-code-precision',
  CODE_INPUT_LABEL_CLASS: 'widget-codes-lists__codes__input-label',
  CODE_INPUT_ACTIONS_CLASS: 'widget-codes-lists__codes__input-actions',
  CODE_INPUT_ERRORS_CLASS: 'widget-codes-lists__codes__input-errors',
  PANEL_CLASS: 'widget-codes-lists__panel',
  PANEL_SELECTOR_CLASS: 'widget-codes-lists__panel-selector',
  PANEL_SELECTOR_OPTION_CLASS: 'widget-codes-lists__panel-selector-option',
};

export const WIDGET_INPUT_FILTER_WITH_CRITERIA = {
  COMPONENT_CLASS: 'widget-input-filter-with-criteria',
  PANEL_INPUT_CLASS: 'widget-input-filter-with-criteria__panel',
  SEARCH_INPUT_CLASS: 'widget-input-filter-with-criteria__panel-search',
  BUTTON_SEARCH_CLASS: 'widget-input-filter-with-criteria__do-search',
};

export const WIDGET_SEARCH_RESULTS = {
  COMPONENT_CLASS: 'widget-search-results',
  HEADER_CLASS: 'widget-search-results__header',
  COLUMN_CLASS: 'widget-search-results__column',
  COLUMN_ACTIONS_CLASS: 'widget-search-results__column-actions',
  ROW_CLASS: 'widget-search-results__row',
  ROW_EMPTY_CLASS: 'widget-search-results__row-empty',
};

export const APP = {
  COMPONENT_ID: 'pogues-legacy',
};

export const domSelectorForModal = (): HTMLElement =>
  document.getElementById(APP.COMPONENT_ID) ?? document.body;
