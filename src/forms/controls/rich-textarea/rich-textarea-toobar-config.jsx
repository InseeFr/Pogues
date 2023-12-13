// @TODO: Add translations

export const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
  extraProps: {
    tabIndex: '-1',
  },
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
  ],
  LINK_BUTTONS: {
    ADD: {
      label: 'Link or Tooltip',
      iconName: 'link',
      placeholder: 'Insert an URL or a tooltip',
    },
    REMOVE: { label: 'Remove Link or Tooltip', iconName: 'remove-link' },
  },
};

export const toolbarConfigQuestion = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
  extraProps: {
    tabIndex: '-1',
  },
  INLINE_STYLE_BUTTONS: [{ label: 'Italic', style: 'ITALIC' }],
  LINK_BUTTONS: {
    ADD: {
      label: 'Link or Tooltip',
      iconName: 'link',
      placeholder: 'Insert an URL or a tooltip',
    },
    REMOVE: { label: 'Remove Link or Tooltip', iconName: 'remove-link' },
  },
};

export const toolbarConfigTooltip = {
  display: ['LINK_BUTTONS'],
  extraProps: {
    tabIndex: '-1',
  },
  LINK_BUTTONS: {
    ADD: {
      label: 'Link or Tooltip',
      iconName: 'link',
      placeholder: 'Insert an URL or a tooltip',
    },
    REMOVE: { label: 'Remove Link or Tooltip', iconName: 'remove-link' },
  },
};

export const rootStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
};
