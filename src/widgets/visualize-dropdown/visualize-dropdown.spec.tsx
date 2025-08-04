import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { VisualizationKind } from '@/api/visualize';

import { APP } from '../../constants/dom-constants';
import VisualizeDropdown from './visualize-dropdown';

vi.mock('@/hooks/useReadonly', () => ({
  useReadonly: vi.fn(),
}));

describe('Visualize Dropdown Component: ', () => {
  test('Should return the right HTML', () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: false,
      componentId: 'component-id',
    };

    const { container } = render(
      <div id={APP.COMPONENT_ID}>
        <VisualizeDropdown {...props} />
      </div>,
    );

    expect(container).toMatchSnapshot();
  });

  test('Should display the dropdown on top', () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: true,
      componentId: 'component-id',
    };

    const { container } = render(
      <div id={APP.COMPONENT_ID}>
        <VisualizeDropdown {...props} />
      </div>,
    );

    expect(container).toMatchSnapshot();
  });

  test('Should disable the button', () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire() {},
      disabled: true,
      top: false,
      componentId: 'component-id',
    };

    const { container } = render(
      <div id={APP.COMPONENT_ID}>
        <VisualizeDropdown {...props} />
      </div>,
    );

    expect(container).toMatchSnapshot();
  });

  test('Should toggle the dropdown', async () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: false,
      componentId: 'component-id',
    };

    render(
      <div id={APP.COMPONENT_ID}>
        <VisualizeDropdown {...props} />
      </div>,
    );

    const dropdownButton = screen.queryByRole('button', {
      name: /visualise/i,
    });
    expect(dropdownButton).not.toBeNull();
    expect(dropdownButton?.getAttribute('aria-expanded')).toBe('false');

    if (dropdownButton) await userEvent.click(dropdownButton);
    expect(dropdownButton?.getAttribute('aria-expanded')).toBe('true');
    if (dropdownButton) await userEvent.click(dropdownButton);

    expect(dropdownButton?.getAttribute('aria-expanded')).toBe('false');
  });

  test('Should call the visualizeActiveQuestionnaire method and hide the dropdown', async () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire: vi.fn(),
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    render(
      <div id={APP.COMPONENT_ID}>
        <VisualizeDropdown {...props} />
      </div>,
    );

    const allAnchors = screen.getAllByRole('link');
    const firstAnchor = allAnchors[0];

    await userEvent.click(firstAnchor);

    expect(props.visualizeActiveQuestionnaire).toHaveBeenCalledWith(
      VisualizationKind.HTML,
      props.componentId,
      props.token,
      false,
      false,
    );
  });
});
