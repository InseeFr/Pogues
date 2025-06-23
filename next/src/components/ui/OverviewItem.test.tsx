import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { renderWithI18n } from '@/tests/tests';

import OverviewItem from './OverviewItem';

describe('OverviewItem', () => {
  it('display content and details on click', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = renderWithI18n(
      <OverviewItem content="My content" details="My details" />,
    );

    expect(getByText('My content')).toBeInTheDocument();
    expect(queryByText('My details')).toBeInTheDocument();
    expect(queryByText('My details')?.parentElement).toHaveAttribute('hidden');

    const expandButton = getByRole('button', { name: 'Expand' });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    // After clicking the expand button, the section should expand
    await user.click(getByRole('button', { name: 'Expand' }));
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    expect(queryByText('My details')?.parentElement).not.toHaveAttribute(
      'hidden',
    );

    // After clicking again, the section should collapse
    await user.click(getByRole('button', { name: 'Collapse' }));
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    expect(queryByText('My details')?.parentElement).toHaveAttribute('hidden');
  });

  it('cannot be expanded when there are no details', async () => {
    const { getByText, queryByRole, queryByText } = render(
      <OverviewItem content="My content" />,
    );

    expect(getByText('My content')).toBeInTheDocument();
    expect(queryByText('My details')).toBeNull();
    expect(queryByRole('button', { name: 'Expand' })).toBeNull();
  });
});
