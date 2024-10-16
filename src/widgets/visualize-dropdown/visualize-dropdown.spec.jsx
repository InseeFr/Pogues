import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import VisualizeDropdown from './components/visualize-dropdown';

describe('Visualize Dropdown Component: ', () => {
  test('Should return the right HTML', () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: false,
      componentId: 'component-id',
    };

    const { container } = render(<VisualizeDropdown {...props} />);

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

    const { container } = render(<VisualizeDropdown {...props} />);

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

    const { container } = render(<VisualizeDropdown {...props} />);

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

    render(<VisualizeDropdown {...props} />);

    // screen.debug();

    const dropdownButton = screen.queryByRole('button', {
      name: /visualise/i,
    });
    expect(dropdownButton).not.toBeNull();
    expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');

    await userEvent.click(dropdownButton);

    expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');

    await userEvent.click(dropdownButton);

    expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
  });

  test('Should call the visualizeActiveQuestionnaire method and hide the dropdown', async () => {
    const props = {
      token: '',
      visualizeActiveQuestionnaire: vi.fn(),
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    render(<VisualizeDropdown {...props} />);

    const allAnchors = screen.getAllByRole('link');
    const firstAnchor = allAnchors[0];

    await userEvent.click(firstAnchor);

    expect(props.visualizeActiveQuestionnaire).toHaveBeenCalledWith(
      'html',
      props.componentId,
      props.token,
    );
  });
});
